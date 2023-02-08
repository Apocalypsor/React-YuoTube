const jwt = require("jsonwebtoken");
const pubkey = Buffer.from(process.env.AUTH0_CERT, 'base64').toString('ascii');

const jwtVerify = async (token) => {
    try {
        return jwt.verify(token, pubkey, {algorithms: ['RS256']});
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    jwtVerify,
}
