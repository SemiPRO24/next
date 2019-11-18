import * as route from './constants/routes';
const routes = require('next-routes');

module.exports = routes().add('signIn', route.SIGN_IN);
