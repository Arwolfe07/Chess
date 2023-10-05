const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const users = require("../models/user.js");

// IMPROVE: Giving codes for now to Handle and show error response in the front-end

module.exports.signup = async (req, res) => {
    const { email, password, name } = req.body;
    
    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(404).json({ message: 'User already exists',code: 'UAE' }) // UAE - User Already Exists
        }
        const hashedPassword = await bcrypt.hash(password, 12); // second argument is salt
        const newUser = await users.create({ email, name, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: {_id: newUser._id, name: newUser.name}, token });
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong...");
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User don\'t exist', code: 'UDE' }); // UDE - User Doesn't Exist
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials",code: 'UA' }) // UA - Un-authorized
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: {_id: existingUser._id, name: existingUser.name, }, token });

    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
};

module.exports.fetchGames = async( req,res) =>{
    const {id: _id} = req.params;
    try {
        const user = await users.findById(_id);
        res.status(200).json(user.games);
    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
}

module.exports.saveGame = async (req, res) => {
    const {userId: _id, saveGameState } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('user unavailable...');
    }
    try {
        const user = await users.findByIdAndUpdate(_id,{$addToSet: {'games': [{savedState: saveGameState}]}});
        console.log(user)
        res.status(200).json({message: 'Game Saved Successfully...'});
    } catch (error) {
        res.status(500).json("Something went wrong...");
    }
}