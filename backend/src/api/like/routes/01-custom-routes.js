module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/likes/count/:videoId',
            handler: 'like.count',
        }
    ]
}
