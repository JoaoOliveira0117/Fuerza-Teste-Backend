import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const authConfig = {
    "secret": "7d5585c7f00a9844528d0173dfbef496", // md5 hash for encryption
};

export default async (req, res, next) => {
    const authHeader = req.headers.authorization; // gets authorization request headers.

    if(!authHeader) // verify if it exists and is not empty.
        return res.status(401).json({ error: ' Token not provided '});

    const [, token] = authHeader.split(' '); // gets only token from the auth header.
    
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret) // verifies if token is valid.

        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(400).send({ error: ' An error has occurred ', err });
    }
}