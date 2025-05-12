import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'your_secret_key'

const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '1h' })

export const JWT = {
    generateToken
}