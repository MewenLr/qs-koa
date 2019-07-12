const dict = {
  username: 'username',
  password: 'password',
  updates: 'updates',
  email: 'email',
  user: 'user',
}

module.exports = {
  errorType: key => `The type of the attribute ${dict[key]} is incorrect`,
  errorEmptyObject: key => `The object ${dict[key]} is empty`,
  errorAttribute: key => `The attribute ${dict[key]} is missing`,
  errorHash: () => 'Failed to hash password',
  errorCompareHash: key => `${dict[key]} doesn't match`,

  failSave: key => `Failed to save ${dict[key]}`,
  docSaved: key => `${dict[key]} saved`,
  docExists: (key, value) => `${dict[key]} ${value} already exists`,
  idNotFound: () => 'The id was not found',
  docNotFound: (key, value) => `${dict[key]} ${value} was not found`,
  failUpdate: () => 'The update failed',
  successUpdate: () => 'Successful update',
  failDelete: () => 'Deletion failed',
  successDelete: key => `${dict[key]} deleted`,

  wrongLanguage: () => 'Language should contain only 2 letters',
  wrongUsername: () => 'Username should contain only letter, digit, _ or - and between 3 to 6 characters',
  wrongEmail: () => 'Email doesn\'t match',
  wrongPassword: () => 'Password should contain at least one digit, one lower case, one upper case and at least 8 characters',
}
