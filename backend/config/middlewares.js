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
    {
        name: "strapi::body",
        config: {
            formidable: {
                maxFileSize: 10 * 1024 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]);
