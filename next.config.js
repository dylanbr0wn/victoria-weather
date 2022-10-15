/** @type {import('next').NextConfig} */
const { withAxiom } = require("next-axiom");

const { withSwrApiEndpoints } = require("@next-fetch/swr");

const nextConfig = withAxiom(
	withSwrApiEndpoints({
		reactStrictMode: true,
		swcMinify: true,
	})
);

module.exports = nextConfig;
