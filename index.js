import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, postCreateValidation } from "./validations.js";

import checkAuth from './utils/checkAuth.js';

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.r9menhe.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/post', PostController.getAll);
app.get('/post/:id', PostController.getOne);
app.post('/post', checkAuth, postCreateValidation, PostController.create);
app.delete('/post/:id', checkAuth, PostController.remove);
app.patch('/post/:id', checkAuth, PostController.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');

});