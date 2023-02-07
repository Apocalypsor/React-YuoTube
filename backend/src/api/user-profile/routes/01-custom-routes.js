module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/auth/callback',
            handler: 'user-profile.callback',
        }
    ]
}
