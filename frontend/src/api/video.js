import {getClient} from "./client";

const getVideos = async () => {
    const videos = await (await getClient()).get('/videos');
    if (videos.data.hasOwnProperty("error")) {
        return [];
    } else {
        return videos.data.data;
    }
}

const getVideoById = async (id) => {
    const video = await (await getClient()).get(`/videos/${id}`);
    if (video.data.hasOwnProperty("error")) {
        return {};
    } else {
        return video.data.data;
    }
}

export {
    getVideos,
    getVideoById
};