/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "gratisography.com",
      `${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      "ellamau-bucket.s3.us-east-2.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: `/${process.env.S3_BUCKET}/**`,
      },
    ],
  },

  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ["localhost:3000", "localhost:3001"],
    },
    serverComponentsExternalPackages: ["mongoose"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://*.stripe.com;
              connect-src 'self' https://*.stripe.com;
              frame-src 'self' https://*.stripe.com https://vercel.live;
              font-src 'self';
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
