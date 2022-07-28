/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");

const nextConfig = withAxiom({
	reactStrictMode: true,
	swcMinify: true,
});

module.exports = nextConfig;
