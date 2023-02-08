'use strict';

/**
 * video service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::video.video', ({strapi}) => ({
    async create(params) {
        const userEmail = params.data.user;
        console.log(userEmail);
        const user = await strapi.service('api::user-profile.user-profile').findByEmail(userEmail);
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }

        params.data.user = null;
        params.data.user = user.id;
        params.populate = ['user'];
        console.log(params);
        return super.create(params);
    }
}));
