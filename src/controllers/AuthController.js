import User from '../models/User.js';

class AuthController {
    async store(req, res) {
        const { email } = req.body;
        try {
            if ( await User.findOne({ email }))
                return res.status(400).send({ error: ' User already exists ' });

            const user = await User.create(req.body);
            user.password = undefined; // prevents password from appearing in the api response.
            
            return res.send({ user });
        } catch (err) {
            return res.status(400).send({ error: ' Registration failed ', err})
        }
    }
}

export default new AuthController();