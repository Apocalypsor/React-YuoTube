import {get} from "./store";

const getUser = async () => {
    const user = await get("user");
    if (user === undefined) {
        return undefined;
    } else {
        return JSON.parse(user);
    }
}

const formatTime = (time) => {
    try {
        const date = new Date(time);
        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    } catch (e) {
        return time;
    }
}

export {
    getUser,
    formatTime,
};