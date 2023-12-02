import mongoose from 'mongoose';
import { AnimeEpisode } from '../animeTypes';

const episodeSchema = new mongoose.Schema<AnimeEpisode>({
    id: String,
    name: String,
    url: String,
    jd: String,
    location: String,
    companyName: String,
});

const EpisodeModel = mongoose.model<AnimeEpisode>('AnimeEpisode', episodeSchema);

export = EpisodeModel;
