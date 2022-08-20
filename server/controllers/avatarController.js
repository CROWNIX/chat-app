import User from "../models/user.js";

const avatarController = {
    setAvatar: async (req, res) => {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            await User.findByIdAndUpdate(userId, {
                isAvatarImageSet: true,
                avatarImage,
            });

            const user = await User.findById(userId);

            return res.status(200).json({isSet: user.isAvatarImageSet, image: user.avatarImage});
        } catch (err) {
            console.log(err.message);
            return res.sendStatus(500);
        }
    },
};

export default avatarController;
