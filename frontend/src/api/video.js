import {getClient} from "./client";
import qs from "qs";

const getVideos = async (page = 1) => {
    const query = qs.stringify({
        sort: ['createdAt:desc'],
        pagination: {
            pageSize: 6,
            page: page,
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });

    const videos = await (await getClient()).get(`/api/videos?${query}`);
    if (videos.data.hasOwnProperty("error")) {
        return [];
    } else {
        return videos.data.data;
    }
}

const getVideoById = async (id) => {
    const video = await (await getClient()).get(`/api/videos/${id}?populate=user`);
    if (video.data.hasOwnProperty("error")) {
        return {};
    } else {
        return video.data.data;
    }
}

const createVideo = async (data) => {
    const response = await (await getClient()).post('/api/videos', data);
    if (!response.data) {
        return {};
    } else {
        return response.data;
    }
}

const upload = async (formData) => {
    const response = await (await getClient()).post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if (!response.data) {
        return {};
    } else {
        const uploaded = response.data;
        const res = {
            video: {},
            cover: {}
        }
        for (let u of uploaded) {
            if (u.mime.startsWith("video")) {
                res.video = u;
                res.video.url = process.env.REACT_APP_API_URL + u.url;
            } else if (u.mime.startsWith("image")) {
                res.cover = u;
                res.cover.url = process.env.REACT_APP_API_URL + u.url;
            }
        }

        return res;
    }
}

const postView = async (id) => {
    const response = await (await getClient()).get(`/api/video/view/${id}`);
    if (!response.data) {
        return {};
    } else {
        return response.data;
    }
}

export {
    getVideos,
    getVideoById,
    createVideo,
    upload,
    postView
};