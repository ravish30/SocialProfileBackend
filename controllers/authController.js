const { generateJwtToken } = require('../common');
const db = require('../config');

const authController = {
    async loginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password) {
            res.status(500).json({ message: 'email and password are required', success: false });
        }

        const existingUser = await db.sequelize.query('select * from user where email = ?', {
            replacements: [email],
            type: db.sequelize.QueryTypes.SELECT
        })

        if(!existingUser.length) {
            return res.status(200).json({ message: 'User Does not Exists', success: false });
        }

        if(existingUser[0].password != password) {
            return res.status(200).json({ message: 'Incorrect Password', success: false });
        }

        await db.sequelize.query('update user set status = ? where id = ?', {
            replacements: [1, existingUser[0].id],
            type: db.sequelize.QueryTypes.UPDATE
        });

        const token = await generateJwtToken(existingUser[0].id);

        return res.status(200).json({ message: 'Login Successfully', success: true, token });
    },
    async registerUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const mobile = req.body.mobile;
        const bio = req.body.bio;
        const userType = req.body.userType || '1';

        if(!email || !password) {
            res.status(500).json({ message: 'email and password are required', success: false });
        }

        const existingUser = await db.sequelize.query('select * from user where email = ?', {
            replacements: [email],
            type: db.sequelize.QueryTypes.SELECT
        })

        if(existingUser.length) {
            return res.status(500).json({ message: 'User Already Exists', success: false });
        }


        const user = await db.sequelize.query('insert into user (email, password, user_type) values (?,?,?)', {
            replacements: [email, password, userType],
            type: db.sequelize.QueryTypes.INSERT
        });

        await db.sequelize.query('insert into profile (user_id, firstname, lastname, mobile, bio, profile_type) values (?,?,?,?,?,?)', {
            replacements: [user[0], firstname, lastname, mobile, bio, '2'],
            type: db.sequelize.QueryTypes.INSERT
        });

        const token = await generateJwtToken(user[0]);


        return res.status(200).json({ message: 'Registered Successfully', success: true, token });
    },
    async logoutUser(req, res) {
        await db.sequelize.query('update user set status = ? where id = ?', {
            replacements: [0, req.user.id],
            type: db.sequelize.QueryTypes.UPDATE
        });


        return res.status(200).json({ message: 'Logged out Successfully', success: true });
    }
}

module.exports = authController;