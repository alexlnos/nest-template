const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');

module.exports = [
    {
        // Явно указываем файлы для проверки
        files: ["src*.ts", "apps*.ts", "libs*.ts", "test*.ts"],

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
            },
            globals: {
                __dirname: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                jest: 'readonly',
                test: 'readonly',
                expect: 'readonly',
            },
        },

        plugins: {
            '@typescript-eslint': eslintPlugin,
            prettier,
            import: importPlugin,
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: 'tsconfig.json' // Указываем путь к tsconfig.json для поддержки алиасов
                }
            }
        },

        rules: {
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
            'import/no-unresolved': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            // Интеграция с Prettier
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],

            // Отступы
            'indent': ['error', 4, { 'SwitchCase': 1 }], // Отступ в 4 пробела
            'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
        },

        ignores: [],
    }
];
