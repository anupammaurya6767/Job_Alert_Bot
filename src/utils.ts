import { AnimeEpisode } from './animeTypes';

const unwantedTitles = [
    'II',
    'Manager',
    'Sr',
    'Staff',
    'Senior',
    '2',
    'Lead',
];

const unwantedDescriptions = [
    '2+ years',
    '1+ years',
    '2 years',
    '1 year',
    '2 yoe',
    '1 yoe',
    '2+ yoe',
    '1+ yoe',
];

export function filterUnwantedEpisodes(episodes: AnimeEpisode[]) {
    return episodes.filter(episode => {
        for (const unwantedTitle of unwantedTitles) {
            if (episode.title.toLowerCase().includes(unwantedTitle.toLowerCase()))
                return false;
        }
        for (const unwantedDescription of unwantedDescriptions) {
            if (episode.description.toLowerCase().includes(unwantedDescription.toLowerCase()))
                return false;
        }
        return true;
    });
}
