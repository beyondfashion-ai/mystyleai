// next.config.js

module.exports = {
    images: {
        // domains: ['replicate.delivery'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
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