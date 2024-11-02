import { compilerOptions } from './tsconfig.json'

import { pathsToModuleNameMapper } from 'ts-jest'

export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
}
