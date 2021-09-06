module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "prefer-rest-params": [
            "off"
        ],
        "@typescript-eslint/no-empty-function": [
            "off"
        ],
        "@typescript-eslint/no-inferrable-types": [
            "off"
        ],
        "@typescript-eslint/ban-types": [
            "off"
        ],
        "@typescript-eslint/typedef": [
            "error",
            {
                "arrowParameter": false,
                "callSignature": true,
                "propertyDeclaration": true,
                "memberVariableDeclaration": true,
                "parameter": true
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": [
                    "public-instance-field",
                    "protected-instance-field",
                    "private-instance-field",
                    "public-constructor",
                    "private-constructor",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method",
                    "public-static-field",
                    "private-static-field",
                    "private-static-method",
                    "private-static-method"
                ]
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": [
            "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "error"
        ],
        "max-len": [
            "error",
            {
                "code": 120
            }
        ]
    }
};
