export interface AnimeEpisode {
    id: string;
    title: string;
    url: string;
    description: string;
    location: string;
    studioName: string;
}

export interface AnimeStudio {
    name: string;
}

export interface Shinigami {
    animeStudio: AnimeStudio;
    getEpisodes: () => Promise<AnimeEpisode[]>;
}
