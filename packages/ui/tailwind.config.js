/** @type {import('tailwindcss').Config} */

const sharedConfig = require("tailwindconfig");

module.exports = {
  ...sharedConfig,
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
};
