'use strict';

/**
 * `auth` middleware
 */

const {jwtVerify} = require("../tool");

module.exports = () => {
    return async (ctx, next) => {
        if (ctx.state.user) return await next();

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
