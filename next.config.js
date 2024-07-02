const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  eslint: {
    ignoreDuringBuilds: false,    
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'djbbbm5n90p1g.cloudfront.net',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname:'api.chatadmin-mod.click',
        port:''
      },
      {
        protocol: 'https',
        hostname:'api.i69app.com',
        port:'',
        pathname:'/media/**'
      }
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,      
      use: ['@svgr/webpack']
    });
    return config;
  }
}

