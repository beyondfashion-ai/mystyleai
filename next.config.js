// next.config.js

module.exports = {
  images: {
    // domains: ['replicate.delivery'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '', // 포트가 없다면 빈 문자열로 둡니다.
        pathname: '/v0/b/**', // 경로 패턴을 지정하여 하위 모든 경로 허용
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/generate',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/mypage',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/playground',
        permanent: true,
      },
      {
        source: '/shopping',
        destination: '/playground',
        permanent: true,
      },
    ]
  }
};
