'use strict';

/**
 * video controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video.video', () => ({
    async find(ctx) {
        ctx.query.populate = ['user'];
        const entities = await super.find(ctx);
        const fields = ['title', 'views', 'thumbnail', 'user', 'createdAt'];
        entities.data = entities.data.map(entity => {
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

    async view(ctx) {
        const {id} = ctx.params;
        const {query} = ctx;
        console.log(id);
        const entity = await strapi.service('api::video.video').findOne(id, query);
        entity.views = '' + (parseInt(entity.views) + 1);
        console.log(entity);
        return await strapi.service('api::video.video').update(id, {
            data: entity
        });
    }
}));
