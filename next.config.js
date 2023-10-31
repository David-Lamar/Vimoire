/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.txt$/,
            use: 'raw-loader'
        })
        // Important: return the modified config
        return config
    },
}

module.exports = nextConfig
