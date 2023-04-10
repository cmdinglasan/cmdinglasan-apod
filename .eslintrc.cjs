module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        indent: ["error", 4],
      },
    ],
  },
};
