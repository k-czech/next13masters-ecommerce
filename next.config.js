/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
