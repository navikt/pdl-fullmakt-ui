module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: [],
    transform: {
        '\\.(css|less)$': '<rootDir>/jest/styleMock.js',
    },
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: ['TS151001'],
            },
        },
    },
};
