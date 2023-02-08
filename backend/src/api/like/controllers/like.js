'use strict';

/**
 * like controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::like.like', ({strapi}) => ({
    async find(ctx) {
        const query = ctx.query;
        const userEmail = query.user;
        const videoId = query.video;
        if (userEmail && videoId) {
            return await strapi.service('api::like.like').findByEmailAndVideoId(userEmail, videoId);
        }

        return super.find(ctx);
    },

    async create(ctx) {
        const body = ctx.request.body;
        const userEmail = body.user;
        const videoId = body.video;
        if (userEmail && videoId) {
            const entity = await strapi.service('api::like.like').findByEmailAndVideoId(userEmail, videoId);
            let res = {};
            res.found = true;
            if (entity.found) {
                res.id = entity.id;
            } else {
                const newEntity = await strapi.entityService.create('api::like.like', {
                    data: {
                        user: entity.user,
                        video: entity.video
                    }
                });
                res.id = newEntity.id;
            }

            return res;
        }

        return super.create(ctx);
    },

    async count(ctx) {
        const {videoId} = ctx.params;
        console.log(videoId);
        return await strapi.service('api::like.like').count(videoId);
    }
}));
