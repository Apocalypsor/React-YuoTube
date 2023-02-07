module.exports = ({env}) => ([
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            headers: '*',
            origin: env('CORS_ORIGIN', '*').split(','),
        }
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]);
