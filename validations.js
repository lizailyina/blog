import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be at least 8 symbols long').isLength({ min: 5 }), 
    body('fullName', 'Enter a name').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be at least 8 symbols long').isLength({ min: 5 }), 
]

export const postCreateValidation = [
    body('title', 'Enter a title').isLength({ min: 3 }).isString(),
    body('text', 'Enter a text').isLength({ min: 10 }).isString(), 
    body('tags', 'Invalid format of tags (enter an array)').optional().isArray(),
    body('imageUrl', 'Invalid image URL').optional().isString(),
]

