'use strict';

/**
 * comment controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({strapi}) => ({
    async create(ctx) {
        const body = ctx.request.body.data;
        const userEmail = body.user;

        if (userEmail) {
            const entity = await strapi.service('api::user-profile.user-profile').findByEmail(userEmail);
            if (entity) {
                console.log("entity.id: " + entity.id);
                ctx.request.body.data.user = entity.id;
            }
        }

        return super.create(ctx);
    }
}));
