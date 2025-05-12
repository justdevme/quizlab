import express, { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { questionRoute } from './questionRoute.js'
import { quizRoute } from './quizRoute.js'
import { resultRoute } from './resultRoute.js'
import { authRoute } from './authRoute.js'

const router = express.Router()

router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: 'APIs V1 are ready to use', code: StatusCodes.OK})
})

router.use('/questions', questionRoute)

router.use('/api/quizzes', quizRoute )

router.use('/api/results', resultRoute)

router.use('/api/auth', authRoute)

export const APIs_V1 = router


