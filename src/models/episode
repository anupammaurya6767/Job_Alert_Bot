import mongoose from 'mongoose';
import { AnimeEpisode } from '../animeTypes';

const episodeSchema = new mongoose.Schema<AnimeEpisode>({
    id: String,
    title: String,
    url: String,
    description: String,
    location: String,
    studioName: String,
});

const EpisodeModel = mongoose.model<AnimeEpisode>('AnimeEpisode', episodeSchema);

export = EpisodeModel;
