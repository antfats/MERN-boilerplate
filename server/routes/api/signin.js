
const User = require('../../models/User');

module.exports = (app) => {
    /*
     * Sign up
     */


    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!firstName) {
            return res.send({
                sucess: false,
                message: 'Error: First Name cannot be blank.'
            });
        }
        if (!lastName) {
            return res.send({
                sucess: false,
                message: "Error: Last Name cannot be blank."
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        email = email.toLowerCase();
        email = email.trim();

        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save

        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exist.'
                });
            }

            // Save the new user

            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            });
        });
    }); // end of sign up endpoint
};