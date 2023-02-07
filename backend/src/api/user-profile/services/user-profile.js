'use strict';

/**
 * user-profile service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-profile.user-profile', ({strapi}) => ({
    async findByEmail(email) {
        const entity = await strapi.entityService.findMany('api::user-profile.user-profile', {
            filters: {email: email}
        });

        if (entity.length === 0) {
            return null;
        } else {
            return entity[0];
        }
    }
}));
