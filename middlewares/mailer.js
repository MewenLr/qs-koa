const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const confirmUserHtml = require('../static/mails/confirm-user/confirm-user')
const resetPwdHtml = require('../static/mails/reset-password/reset-password')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_PROJECT,
    pass: process.env.MAIL_PASS,
  },
})

module.exports = (ctx, email, mailType, data) => new Promise(async (res, rej) => {
  const dict = {
    confirmUserMail: {
      subject: ctx.i18n.__('mail.confirm-user.subject'),
      html: confirmUserHtml(ctx, data),
      success: ctx.i18n.__('success.confirm-mail'),
    },
    resetPwdMail: {
      subject: ctx.i18n.__('mail.reset-pwd.subject'),
      html: resetPwdHtml(ctx, data),
      success: ctx.i18n.__('success.reset-pwd-mail'),
    },
  }

  const options = {
    fonts: {
      Roboto: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
    },
  }

  try {
    const htmlOutput = await mjml2html(dict[mailType].html, options)
    transporter.sendMail({
      from: `My Custom Website <${process.env.MAIL_PROJECT}>`,
      to: `${email}`,
      subject: dict[mailType].subject,
      text: '',
      html: htmlOutput.html,
    }, (err) => {
      if (err) rej({ code: 400, msg: ctx.i18n.__('failure.send-mail') })
      res({ code: 200, msg: dict[mailType].success })
    })
  } catch (err) {
    ctx.status = err.code || 400
    ctx.body = ctx.i18n.__('failure.compile-mjml')
  }
})
