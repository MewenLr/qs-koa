const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_PROJECT,
    pass: process.env.MAIL_PASS,
  },
})

module.exports = (ctx, email, subject, html) => new Promise((res, rej) => {
  const trans = ctx.state.transFile

  transporter.sendMail({
    from: `My Custom Website <${process.env.MAIL_PROJECT}>`,
    to: `${email}`,
    subject,
    text: '',
    html,
  }, (err) => {
    if (err) rej({ code: 400, msg: trans.failMailer() })
    res({ code: 200, msg: trans.successMailer() })
  })
})
