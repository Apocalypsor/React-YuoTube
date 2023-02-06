import {get} from "./store";

const getUser = async () => {
    const user = await get("user");
    if (user === undefined) {
        return undefined;
    } else {
        return JSON.parse(user);
    }
}

export {getUser};