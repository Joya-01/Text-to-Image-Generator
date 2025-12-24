import axios from "axios";
import User from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId);
        const prompt = req.body.prompt;
        // console.log(prompt);


        // console.log(userId + " " + prompt);
        const user = await User.findById(userId);
        console.log(user);

        if (!user || !prompt) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.credit_balance <= 0) {
            return res.json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })  
        
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImg = `data:image/png;base64,${base64Image}`;

        await User.updateCreditBalance(userId, -1); // Deduct 1 credit

        return res.status(200).json({ success: true, creditBalance: User.creditBalance , image: resultImg });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}