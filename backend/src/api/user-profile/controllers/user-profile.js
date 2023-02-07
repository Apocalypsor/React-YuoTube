'use strict';

const {jwtVerify} = require("../../../tool");
/**
 * user-profile controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-profile.user-profile', ({strapi}) => ({
    async callback(ctx) {
        const body = ctx.request.body;
        if (body.token) {
            const jwt = await jwtVerify(body.token);
            if (jwt) {
                const {nickname, name, email, picture} = jwt;
                const entity = await strapi.service('api::user-profile.user-profile').findByEmail(email);

                if (!entity) {
                    return await strapi.service('api::user-profile.user-profile').create({
                        data: {
                            nickname: nickname,
                            name: name,
                            email: email,
                            picture: picture,
                        }
                    });
                } else {
                    return await strapi.service('api::user-profile.user-profile').update(
                        entity.id,
                        {
                            data: {
                                nickname: nickname,
                                name: name,
                                email: email,
                                picture: picture,
                            }
                        });
                }
            }
        }

        ctx.unauthorized('Invalid token');
    }
}));
