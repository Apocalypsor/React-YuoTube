import {createSessionPersister, createStore} from 'tinybase';

const store = createStore();
const persister = createSessionPersister(store, 'yuotubeStore');

const set = async (key, value) => {
    store.setValue(key, value);
    await persister.save();
}

const get = async (key) => {
    await persister.load();
    return store.getValue(key);
}

export {set, get};