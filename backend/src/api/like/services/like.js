'use strict';

/**
 * like service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::like.like', ({strapi}) => ({
    async findByEmailAndVideoId(userEmail, videoId) {
        const user = await strapi.service('api::user-profile.user-profile').findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }

        const entity = await strapi.entityService.findMany('api::like.like', {
            filters: {user: user.id, video: videoId}
        });
        if (entity.length === 0) {
            const res = {};
            res.found = false;
            res.user = user.id;
            res.video = videoId;
            return res;
        } else {
            const res = entity[0];
            res.found = true;
            res.user = user.id;
            res.video = videoId;
            return res;
        }
    },

    async count(videoId) {
        const entity = await strapi.entityService.findMany('api::like.like', {
            filters: {video: videoId}
        });
        return entity.length;
    }
}));
