module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'prettier', // Adds the prettier plugin
        'import',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier', // Enables eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    root: true,
    env: {
        node: true, // Enables Node.js global variables
        jest: true, // Enables Jest test global variables
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: true,
            },
        ],
        'import/no-unresolved': 'error', // turn on errors for missing imports
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    ['sibling', 'parent'],
                    'index',
                    'unknown',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc', // sort in ascending order
                    caseInsensitive: true, // ignore case
                },
            },
        ],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use .prettierrc file to determine rules
    },
}
