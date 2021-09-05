import { validate } from 'uuid';

export default async (req, res, next) => {
    const id = req.params.id // gets id from request params

    if(!validate(id)) // validates it
        return res.status(400).send({ error: ' Invalid id '});

    return next();
}