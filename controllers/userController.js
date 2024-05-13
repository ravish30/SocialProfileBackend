const db = require('../config');

const userController = {
    async editProfile(req, res) {
        const body = req.body;
        const finalArr = [];
        for(const key in body) {
            if(key == 'profile_image') {
                continue;
            }
            finalArr.push(`${key} = '${body[key]}'`)
        }

        if(req.file) {
            const filePath = req.file.path.replace('\\', '\\\\');
            finalArr.push(`profile_image = '${filePath}'`);
        }

        if(finalArr.length) {
            await db.sequelize.query(`update profile set ${finalArr.join(",")} where user_id = ?`, {
                replacements: [req.user.id],
                type: db.sequelize.QueryTypes.UPDATE
            }); 
        }

        res.status(200).json({ message: 'profile updated', success: true }) 
    },
    async getProfileDetails(req, res) {
        const userId = req.query.user_id;

        const userData = await db.sequelize.query(`select * from profile where user_id = ?`, {
            replacements: [userId],
            type: db.sequelize.QueryTypes.SELECT
        });

        if(req.user.user_type == '2' || userData[0].profile_type == '1') {
            return res.status(200).json({ message: 'Fetched Successfully', success: true, data: {
                firstname: userData[0].firstname,
                lastname: userData[0].lastname,
                mobile: userData[0].mobile,
                bio: userData[0].bio
            } })
        }
        else {
            return res.status(200).json({ message: 'User Profile is Private', success: true, data: {} })
        }
         
    },
}

module.exports = userController;