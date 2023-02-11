import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from "./validations/auth.js";
import {login, register, getMe} from "./controllers/UserController.js";

import checkAuth from './utils/checkAuth.js';

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.r9menhe.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', login);

app.post('/auth/register', register);

app.get('/auth/me', checkAuth, getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');

});