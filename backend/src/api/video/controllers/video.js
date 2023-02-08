'use strict';

/**
 * video controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video.video', () => ({
    async find(ctx) {
        ctx.query.populate = "*";
        const entities = await super.find(ctx);

        const fields = ['title', 'views', 'likes', 'thumbnail', 'user', 'createdAt'];
        entities.data = entities.data.map(entity => {
            entity.attributes.likes = entity.attributes.likes.data.length;
            entity.attributes = Object.entries(entity.attributes).reduce((newObj, [key, value]) => {
                if (fields.includes(key)) {
                    newObj[key] = value;
                }
                return newObj;
            }, {});
            return entity;
        });
        return entities;
    },

    async findOne(ctx) {
        ctx.query.populate = "*";
        const entity = await super.findOne(ctx);
        if (entity.data) {
            entity.data.attributes.likes = entity.data.attributes.likes.data.length;
        }

        return entity;
    },

    async view(ctx) {
        const {id} = ctx.params;
        const {query} = ctx;
        console.log(id);
        const entity = await strapi.service('api::video.video').findOne(id, query);
        entity.views = '' + (parseInt(entity.views) + 1);
        console.log(entity);
        const res = await strapi.service('api::video.video').update(id, {
            data: entity
        });

        return res.views;
    }
}));
