import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be at least 8 symbols long').isLength({ min: 5 }), 
    body('fullName', 'Enter a name').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
]
