/* eslint-disable object-curly-newline */
module.exports = {

  regUser: (username, password, email) => [
    { key: 'username', type: 'string', data: username, dataRequired: true },
    { key: 'password', type: 'string', data: password, dataRequired: true },
    { key: 'email', type: 'string', data: email, dataRequired: true },
  ],

  authUser: (username, password) => [
    { key: 'username', type: 'string', data: username, dataRequired: true },
    { key: 'password', type: 'string', data: password, dataRequired: true },
  ],

  updUser: (username, updates = {}) => [
    { key: 'username', type: 'string', data: username, dataRequired: true },
    {
      key: 'updates',
      type: 'object',
      data: updates,
      dataRequired: true,
      entries: [
        { entryRequired: false, key: 'username', type: 'string', data: updates.username, dataRequired: true },
        { entryRequired: false, key: 'password', type: 'string', data: updates.password, dataRequired: true },
        { entryRequired: false, key: 'email', type: 'string', data: updates.email, dataRequired: true },
      ],
    },
  ],

  delUser: username => [
    { key: 'username', type: 'string', data: username, dataRequired: true },
  ],

}
