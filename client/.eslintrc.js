module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "airbnb", "airbnb-typescript"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname.includes("client") && __dirname
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/function-component-definition": [
            2,
            { namedComponents: "arrow-function" }
        ],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/comma-dangle": ["error", "never"],
        "@typescript-eslint/indent": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-wrap-multilines": 0,
        "react/require-default-props": 0,
        "no-shadow": 0,
        "@typescript-eslint/no-shadow": 0,
        "react/jsx-filename-extension": 0,
        "arrow-body-style": 0,
        "react/state-in-constructor": 0,
        "object-curly-newline": 0,
        "operator-linebreak": 0,
        "import/extensions": 0
    }
};
