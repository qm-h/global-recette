import { MailerOptions } from '../types'
import nodemailerMiddleware from '../../services/nodemailer/nodemailerService'

const sendEmail = async (mailerOptions: MailerOptions) => {
    await nodemailerMiddleware.sendMail(mailerOptions)
}

export { sendEmail }
