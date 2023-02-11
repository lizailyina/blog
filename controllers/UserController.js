import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarURL: req.body.avatarURL,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...UserData } = user._doc;

        res.json({
            ...UserData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Registration failed",
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        console.log(req.body.password, user._doc.passwordHash)

        const IsValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!IsValidPass) {
            return res.status(400).json({
                message: "Incorrect login or password",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );


        const { passwordHash, ...UserData } = user._doc;

        res.json({
            ...UserData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Authorization failed",
        })
    }
}

export const getMe =  async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        
        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        
        const { passwordHash, ...UserData } = user._doc;

        res.json({
            ...UserData,
        });
    } catch (err) {
        return console.log(err);
    }
}