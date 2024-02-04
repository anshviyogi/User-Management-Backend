const jwt = require("jsonwebtoken")

function createToken(data) {
    let token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })

    return token;
}

module.exports = createToken;