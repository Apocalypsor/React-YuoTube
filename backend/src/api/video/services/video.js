'use strict';

/**
 * video service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::video.video', ({strapi}) => ({
    async create(params) {
        const userEmail = params.data.user;
        const user = await strapi.service('api::user-profile.user-profile').findByEmail(userEmail);
        if (!user) {
            throw new Error("User not found");
        }

        params.data.user = user.id;
        return super.create(params);
    }
}));
