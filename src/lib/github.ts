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

        // Calculate popularity score similar to GitHub's algorithm
        // Combines stars, forks, and recency with weighted importance
        const scoredRepos = repos
            .filter((repo: any) => !repo.fork && !repo.private)
            .map((repo: any) => {
                const daysSinceUpdate = Math.floor(
                    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
                );
                const recencyScore = Math.max(0, 365 - daysSinceUpdate) / 365; // Decay over a year

                // Weighted score: stars (60%) + forks (30%) + recency (10%)
                const popularityScore =
                    (repo.stargazers_count * 0.6) +
                    (repo.forks_count * 0.3) +
                    (recencyScore * 10 * 0.1);

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
