import jwt from 'jsonwebtoken';
import { message } from '../configs/message.js';
import { keyRoleApp } from '../configs/key_role.js';

const isSuperAdmin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);

        // Vérifie si le rôle de l'utilisateur superAdmin
        if (decoded.r !== keyRoleApp.superAdmin) {
            return res.status(403).json({ message: message.roleAccesNonAutoriser });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};


const isAdmin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);

        // Vérifie si le rôle de l'utilisateur est admin ou superAdmin
        if (decoded.r !== keyRoleApp.superAdmin && decoded.r !== keyRoleApp.admin) {
            return res.status(403).json({ message: message.roleAccesNonAutoriser });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};

// // Middleware pour autoriser uniquement l'admin ou l'employé
const isAdminOrModerator = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);


        if (decoded.r !== keyRoleApp.superAdmin && decoded.r !== keyRoleApp.admin && decoded.r !== keyRoleApp.moderator) {
            return res.status(403).json({ message: message.roleAccesNonAutoriser });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};




// // Middleware pour autoriser uniquement l'admin, l'employé ou l'utilisateur avec l'autorisation du token
// const isAdminOrModeratorOrAuthorizedUser = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ message: message.tokenAccesNonAutoriser });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_JWT_KEYS);

//         if (decoded.r === keyRoleApp.superAdmin && decoded.r !== keyRoleApp.admin && decoded.r !== keyRoleApp.moderator) {
//             return res.status(403).json({ message: message.roleAccesNonAutoriser });
//         }
//         if (req.user.role === 'admin' && req.user.role === 'employed' && req.user.userId === req.params.userId) {
//             return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });

//         }
//         next();

//     } catch (error) {
//         res.status(401).json({ message: message.invalidToken });
//     }
// };





// Nouveau Middleware pour autoriser uniquement l'admin ou l'utilisateur avec l'autorisation du token
const justVerifiyHeaderTokenAuthorization = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: message.tokenAccesNonAutoriser });
    }

    try {

        next();

    } catch (error) {
        res.status(401).json({ message: message.invalidToken });
    }
};





// export { isAdmin, isAdminOrEmployed, isAdminOrAuthorizedUser, isAdminOrEmployedOrAuthorizedUser, justVerifiyHeaderTokenAuthorization };
export { isSuperAdmin, isAdmin, isAdminOrModerator, justVerifiyHeaderTokenAuthorization };
