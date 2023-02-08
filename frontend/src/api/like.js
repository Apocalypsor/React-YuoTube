import {getClient} from "./client";

const getLike = async (user, video) => {
    const res = await (await getClient()).get(`/api/likes?user=${user}&video=${video}`);
    return res.data;
}

const postLike = async (user, video) => {
    const res = await (await getClient()).post(`/api/likes`, {user, video});
    return res.data;
}

const postUnlike = async (id) => {
    const res = await (await getClient()).delete(`/api/likes/${id}`);
    return res.data;
}

const getLikeCount = async (videoId) => {
    const res = await (await getClient()).get(`/api/likes/count/${videoId}`);
    return res.data;
}

export {
    getLike,
    postLike,
    postUnlike,
    getLikeCount
}