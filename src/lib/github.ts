export async function getTopRepos(username: string) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
                next: { revalidate: 3600 }, // Cache for 1 hour
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
            }
        );

        if (!response.ok) {
            console.error('GitHub API error:', response.status);
            return [];
        }

        const repos = await response.json();

        // GitHub's popular repos seem to prioritize recent activity heavily
        // when stars/forks are similar (or all zero)
        const scoredRepos = repos
            .filter((repo: any) =>
                !repo.fork &&
                !repo.private &&
                repo.name !== 'Nevidu-Jayatilleke' // Exclude website repo
            )
            .map((repo: any) => {
                const daysSinceUpdate = Math.floor(
                    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
                );
                // Higher recency score for more recent updates
                const recencyScore = Math.max(0, 180 - daysSinceUpdate); // Decay over 180 days

                // When most repos have 0 stars/forks, prioritize recency heavily
                // Weighted score: stars (20%) + forks (10%) + recency (70%)
                const popularityScore =
                    (repo.stargazers_count * 20) +
                    (repo.forks_count * 10) +
                    recencyScore;

                return { ...repo, popularityScore };
            });

        return scoredRepos
            .sort((a: any, b: any) => b.popularityScore - a.popularityScore)
            .slice(0, 6);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}
