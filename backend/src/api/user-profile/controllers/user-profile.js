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

                let res;
                if (!entity) {
                    res = strapi.service('api::user-profile.user-profile').create({
                        data: {
                            nickname: nickname,
                            name: name,
                            email: email,
                            picture: picture,
                        }
                    });
                } else {
                    res = await strapi.service('api::user-profile.user-profile').update(
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

                return strapi.plugins['users-permissions'].services.jwt.issue({
                    id: process.env.DUMMY_USER_ID,
                });
            }
        }

        ctx.unauthorized('Invalid token');
    }
}));
