import { MailerOptions } from '../../shared/types'
import dotenv from 'dotenv'
import { logger } from '../../server'
import nodemailer from 'nodemailer'

dotenv.config()

const nodemailerMiddleware = {
    transporter: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    }),
    sendMail: async (mailOptions: MailerOptions) => {
        await nodemailerMiddleware.transporter
            .sendMail<MailerOptions>(mailOptions)
            .then((info) => {
                logger.info(`NODE MAILER: ${JSON.stringify(info)}`)
            })
            .catch((err) => {
                logger.error(`NODE MAILER: ${JSON.stringify(err)}`)
            })
    },
}

export default nodemailerMiddleware
