'use strict';

/**
 * video controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video.video', () => ({
    async find(ctx) {
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
    }
}));
