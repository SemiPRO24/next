const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod
    ? 'https://svpp-1532e.firebaseapp.com/'
    : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://svpp-1532e.firebaseapp.com/',
};
