const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

module.exports = (ctx, email) => new Promise((res, rej) => {
  const trans = ctx.state.transFile

  transporter.sendMail({
    from: `Fred Foo 👻 <${process.env.MAIL_USER}>`,
    to: `${email}`,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  }, (err) => {
    if (err) rej({ code: 400, msg: trans.failMailer() })
    res({ code: 200, msg: trans.successMailer() })
  })
})
