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
        return repos
            .filter((repo: any) => !repo.fork && !repo.private)
            .sort((a: any, b: any) => b.watchers_count - a.watchers_count)
            .slice(0, 6);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}
