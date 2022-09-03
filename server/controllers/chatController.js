import User from "../models/user.js";
import Message from "../models/Message.js";

const chatController = {
    getAllUser: async (req, res) => {
        const userId = req.params.id;

        try {
            const users = await User.find({_id: {$ne: userId}}).select(["email", "username", "avatarImage", "_id"]);

            return res.status(200).json({users});
        } catch (err) {
            console.log(err.message);
            return res.sendStatus(500);
        }
    },
    addMessage: async (req, res) => {
        try {
            const {from, to, message} = req.body;
            const data = await Message.create({
                message: {text: message},
                users: [from, to],
                sender: from,
            });

            return res.status(201).json({msg: "Message added successfully."});
        } catch (err) {
            console.log(err.message);
            return res.sendStatus(500);
        }
    },
    getAllMessage: async (req, res) => {
        try {
            const {from, to} = req.params;
            const messages = await Message.find({
                users: {
                    $all: [from, to],
                },
            }).sort({updatedAt: 1});

            const projectMessages = messages.map((message) => {
                return {
                    fromSelf: message.sender.toString() === from,
                    message: message.message.text,
                };
            });

            return res.status(200).json({projectMessages});
        } catch (err) {
            console.log(err.message);
            return res.sendStatus(500);
        }
    },
};

export default chatController;
