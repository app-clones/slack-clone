module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ["airbnb-base", "airbnb-typescript/base"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname.includes("server") ? "./" : __dirname
    },
    ignorePatterns: ["src/types/graphql.ts"],
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/comma-dangle": 0,
        "object-curly-newline": 0,
        "function-paren-newline": 0,
        "no-promise-executor-return": 0,
        "implicit-arrow-linebreak": 0,
        "no-restricted-syntax": 0,
        "no-confusing-arrow": 0
    }
};
