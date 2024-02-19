import jwt from 'jsonwebtoken';
import { message } from '../configs/message.js';


// l'utilisateur avec l'autorisation du token , fait reference a celui qui effectue l'action sur ses donnees
const isClientAuthorized = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);

        if (decoded.cId === req.params.clientId) {
            return next();
        } else {
            return res.status(403).json({ message: message.roleAccesNonAutoriser });
        }
    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};


const isValidClient = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        jwt.verify(token, process.env.SECRET_JWT_KEYS);

        return next();

    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};


export { isClientAuthorized, isValidClient }

