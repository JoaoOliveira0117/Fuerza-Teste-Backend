import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const authConfig = {
    "secret": "7d5585c7f00a9844528d0173dfbef496", // md5 hash for encryption
};

class AuthController {
    async create(req, res) {
        const { email, password, name} = req.body;
        try {
            if(!email || !password || !name) //verify if data exists and is not empty.
                return res.status(400).send({ error: ' Email and password must not be empty '})

            if ( await User.findOne({ email }))
                return res.status(400).send({ error: ' User already exists ' });

            const user = await User.create(req.body);
            user.password = undefined; // prevents password from appearing in the api response.
            
            return res.send({ user });
        } catch (err) {
            return res.status(500).send({ error: ' Registration failed ', err})
        }
    }

    async store(req,res) {
        const { email, password } = req.body;

        try{
            if(!email || !password) //verify if data exists and is not empty.
                return res.status(400).send({ error: ' Email and password must not be empty '})

            const user = await User.findOne({ email })
                                    .select('+password');

            if(!user)
                return res.status(404).send({ error: 'User not found'});

            if(!await bcrypt.compare(password, user.password))
                return res.status(400).send({ error: 'Invalid password' });

            user.password = undefined; // prevents password from appearing in the api response.

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400, // one day.
            });

            res.send({ user, token });
        } catch (err) {
            return res.status(500).send({ error: ' Login failed ', err})
        }
    }
}

export default new AuthController();