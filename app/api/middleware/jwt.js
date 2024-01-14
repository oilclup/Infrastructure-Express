import config from '../configs/app'

var jwt = require('jsonwebtoken')

const secretKey = config.jwt_secret_key

const sign = (payload) => {
    let token = jwt.sign(payload, secretKey, {
        expiresIn: '1d',
    });
    return token;
};

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

export { sign, verify };
