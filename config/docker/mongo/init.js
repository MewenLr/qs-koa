/* eslint-disable */
db = new Mongo().getDB('admin')
db.createUser({
  user: 'adminuser',
  pwd: 'adminpass',
  roles: [{
    role: 'clusterAdmin',
    db: 'admin',
  }]
})

db.auth('adminuser', 'adminpass')

db = db.getSiblingDB('dbdev')
db.createUser({
  user: 'dbuser',
  pwd: 'dbpass',
  roles: [{
    role: 'dbOwner',
    db: 'dbdev',
  }],
})

db = db.getSiblingDB('dbtest')
db.createUser({
  user: 'dbuser',
  pwd: 'dbpass',
  roles: [{
    role: 'dbOwner',
    db: 'dbtest',
  }],
})
