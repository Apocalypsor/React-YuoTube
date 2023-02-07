import {getClient} from "./client";

const postAuthCallback = async (token) => {
    const client = await getClient();
    const response = await client.post("/auth/callback", {
        token: token,
    });
    return response.data;
}

export {
    postAuthCallback
};