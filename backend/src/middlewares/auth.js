'use strict';

/**
 * `auth` middleware
 */

const {jwtVerify} = require("../tool");

module.exports = () => {
    return async (ctx, next) => {
        const {token} = await ctx.request.header;
        if (!token) {
            return ctx.unauthorized('No authorization header');
        } else {
            try {
                ctx.state.user = await jwtVerify(token);
            } catch (err) {
                return ctx.unauthorized('Invalid token');
            }
        }

        await next();
    };
};
