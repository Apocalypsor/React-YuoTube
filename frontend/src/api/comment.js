import {getClient} from "./client";
import qs from "qs";

const getCommentByVideoId = async (videoId) => {
    const query = qs.stringify({
        populate: ["user"],
        filters: {
            video: {
                id: {
                    $eq: videoId
                }
            },
        },
    }, {
        encodeValuesOnly: true,
    });

    const res = await (await getClient()).get(`/api/comments?sort=createdAt:desc&${query}`);
    if (res.data.hasOwnProperty("error")) {
        return [];
    } else {
        return res.data.data;
    }
}

const postComment = async (videoId, userId, content) => {
    const res = await (await getClient()).post("/api/comments", {
        data: {
            video: videoId,
            user: userId,
            content: content,
        }
    });
    return res.data;
}

export {
    getCommentByVideoId,
    postComment
}