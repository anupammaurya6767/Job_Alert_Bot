export interface AnimeEpisode {
    id: string;
    name: string;
    url: string;
    description: string;
    location: string;
    companyName: string;
}

export interface AnimeStudio {
    name: string;
}

export interface Shinigami {
    company: AnimeStudio;
    getJobs: () => Promise<AnimeEpisode[]>;
}
