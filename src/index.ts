const shinigamiNote = require('dotenv');
shinigamiNote.config();

import { AnimeStudio, Shinigami, AnimeEpisode } from "./animeTypes";
import mongoose from 'mongoose';
import EpisodeModel from "./models/episode";

import axios from 'axios'; // Import Axios for making HTTP requests

// Anime Studios
import deathNoteStudios from "./animeStudios/DeathNoteStudios";
import attackOnTitanStudios from "./animeStudios/AttackOnTitanStudios";
import fullmetalAlchemistStudios from "./animeStudios/FullmetalAlchemistStudios";
import onePieceStudios from "./animeStudios/OnePieceStudios";
import narutoStudios from "./animeStudios/NarutoStudios";

const animeDB = {
    username: process.env.ANIME_DB_USERNAME,
    password: process.env.ANIME_DB_PASSWORD
};

mongoose.connect(`mongodb+srv://${animeDB.username}:${animeDB.password}@anime-cluster.5gkbu.mongodb.net/AnimeAlert?retryWrites=true&w=majority`);

const animeShinigamis: Shinigami[] = [
    deathNoteStudios,
    attackOnTitanStudios,
    fullmetalAlchemistStudios,
    onePieceStudios,
    narutoStudios,
];

async function main() {
    for (const shinigami of animeShinigamis) {
        try {
            const allNewEpisodes = await shinigami.getEpisodes();
            const processedEpisodes = await postProcessEpisodes(allNewEpisodes);
            await updateEpisodes(processedEpisodes, shinigami.animeStudio);
        } catch (err: any) {
            console.log(`Error processing episodes for ${shinigami.animeStudio.name}: ${err}`);
        }
    }
    console.log("Starting anime cleanup");
    await cleanUp();
    console.log("Anime Cleanup Finished");
}

async function postProcessEpisodes(episodes: AnimeEpisode[]) {
    // You can add any additional post-processing logic here
    return episodes;
}

async function updateEpisodes(episodes: AnimeEpisode[], studio: AnimeStudio) {
    // Get previous episodes
    const prevEpisodes: AnimeEpisode[] = await EpisodeModel.find({
        studioName: studio.name
    }).exec();
    const prevEpisodeIds = new Set<string>();
    prevEpisodes.forEach(episode => prevEpisodeIds.add(episode.id));

    // Get the difference
    const newEpisodes = episodes.filter(episode => !prevEpisodeIds.has(episode.id));

    // Cleanup all old episodes and add the new ones obtained in this fetch
    await EpisodeModel.deleteMany({ studioName: studio.name });
    for (const episode of episodes) {
        const newEpisode = new EpisodeModel(episode);
        await newEpisode.save();
    }

    // Alert about new episodes
    await sendNotifications(newEpisodes, studio);
}

async function sendNotifications(episodes: AnimeEpisode[], studio: AnimeStudio) {
    // Send HTTP requests to your desired endpoint for each new episode
    console.log("Sending notifications for:", studio.name, episodes.length);
    for (const episode of episodes) {
        await sendEpisodeToEndpoint(episode);
    }
}

async function sendEpisodeToEndpoint(episode: AnimeEpisode) {
    const endpointUrl = 'YOUR_ENDPOINT_URL'; // Replace with your actual endpoint URL
    try {
        await axios.post(endpointUrl, episode);
        console.log("Episode sent to endpoint:", episode);
    } catch (error) {
        console.error("Error sending episode to endpoint:", error);
    }
}

async function cleanUp() {
    mongoose.disconnect();
}

main();
