'use strict';

/**
 * video router
 */

const {createCoreRouter} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::video.video', {
    only: ['find', 'findOne', 'create'],
    config: {
        create: {
            middlewares: ['global::auth']
        }
    }
});
