const jwt = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../_helpers/db');
module.exports = authorize
function authorize(roles = []) {
    if (typeof roles == 'string')
        roles = [roles]

    return [
        jwt({
            secret,
            algorithms: ['HS256'],
            getToken: function getTokenFromCookie(req) {
                const token = req.cookies.token
                if (!token) return null
                return token
            }
            }),

        async (req,res,next) => {
            const user = await db.user.findByPk(req.user.sub);
            if(!user || (roles.length && !roles.includes(user.role))){
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = user.get();
            next()
        }
        
    ]
    
}