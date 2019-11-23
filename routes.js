const routes = require('next-routes');

module.exports = routes()
  .add('signIn', '/signin')
  .add('forget-password', '/forget-password')
  .add('signUp', '/signup')
  .add('home', '/home')
  .add('account', '/account');
