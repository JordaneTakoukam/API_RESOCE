import jwt from 'jsonwebtoken';
import { message } from '../configs/message.js';
import { keyRoleApp } from '../configs/key_role.js';


// l'utilisateur avec l'autorisation du token , fait reference a celui qui effectue l'action sur ses donnees

const isAdminOrOwnerOrManager = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);

        // Vérifie si le rôle de l'utilisateur est admin ou superAdmin
        if (decoded.r !== keyRoleApp.superAdmin && decoded.r !== keyRoleApp.admin && decoded.r !== keyRoleApp.owner && decoded.r !== keyRoleApp.manager) {
            return res.status(403).json({ message: message.roleAccesNonAutoriser });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};

export { isAdminOrOwnerOrManager }

