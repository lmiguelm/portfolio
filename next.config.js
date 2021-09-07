const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    sw: '/sw.js',
    disable: process.env.NODE_ENV == 'development',
  },
  images: {
    domains: [
      'lmguelm-portfolio-images.s3-sa-east-1.amazonaws.com',
      'firebasestorage.googleapis.com',
      'github.com',
    ],
  },
});
