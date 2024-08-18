/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs)$/,
            exclude: /node_modules/,
            use: [
                'webpack-glsl-loader'
            ],
        });

        return config;
    },
};

export default nextConfig;
