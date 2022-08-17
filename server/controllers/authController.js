import User from "../models/user.js";
import bcrypt from "bcrypt";

const authController = {
    register: async (req, res, next) => {
        const {username, email, password} = req.body;

        try {
            const checkUsername = await User.findOne({username});
            const checkEmail = await User.findOne({email});

            if (checkUsername) return res.status(404).json({msg: "Username already used", status: false});

            if (checkEmail) return res.status(404).json({msg: "Email already used", status: false});

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                email,
                username,
                password: hashPassword,
            });

            delete User.password;
            return res.status(201).json({user, status: true});
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    },
    login: async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await User.findOne({username});

            if (!user) return res.status(404).json({msg: "Incorrect username or password", status: false});

            const match = await bcrypt.compare(password, user.password);

            if (!match) return res.status(404).json({msg: "Incorrect username or password", status: false});

            delete user.password;
            return res.status(201).json({user, status: true});
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    },
};

export default authController;
