const dict = {
  username: 'username',
  password: 'password',
  updates: 'updates',
  email: 'email',
  user: 'user',
}

module.exports = {
  // errors
  errorType: key => `The type of the attribute ${dict[key]} is incorrect`,
  errorEmptyObject: key => `The object ${dict[key]} is empty`,
  errorAttribute: key => `The attribute ${dict[key]} is missing`,
  errorConfirmAccount: () => 'You must first confirm your account',
  errorLanguage: () => 'Language should contain only 2 letters',
  errorUsername: () => 'Username should contain only letter, digit, _ or - and between 3 to 6 characters',
  errorEmail: () => 'Email doesn\'t match',
  errorPassword: () => 'Password should contain at least one digit, one lower case, one upper case and at least 8 characters',

  // fails
  failHash: () => 'Failed to hash password',
  failCompareHash: key => `${dict[key]} doesn't match`,
  failSave: key => `Failed to save ${dict[key]}`,
  failUpdate: () => 'The update failed',
  failDelete: () => 'Deletion failed',
  failMailer: () => 'Failed to send email',

  idNotFound: () => 'The id was not found',
  docNotFound: (key, value) => `${dict[key]} ${value} was not found`,
  docExists: (key, value) => `${dict[key]} ${value} already exists`,

  // success
  docSaved: key => `${dict[key]} saved`,
  pwdUpdated: () => 'Password updated',
  successUpdate: () => 'Successful update',
  successDelete: key => `${dict[key]} deleted`,
  successConfirmationMail: () => 'A confirmation email has been sent to you',
  successResetPwdMail: () => 'A email to reset your password has been sent to you',

  // mails
  confirmationMailSubject: () => 'Confirmation email',
  confirmationMailHtml: token => `<p>Click on the following link to confirm your account: http://localhost:3030/confirmation/${token}</p>`,
  resetPwdMailSubject: () => 'Reset password email',
  resetPwdMailHtml: token => `<p>Click on the following link to reset your password: http://localhost:3030/reset-password/${token}</p>`,
}
