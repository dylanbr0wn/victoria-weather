/** @type {import('next').NextConfig} */
const { withAxiom } = require("next-axiom");


const nextConfig = withAxiom(
  {
    reactStrictMode: true,
    experimental: {
      appDir: true
    }
  }
);

module.exports = nextConfig;
