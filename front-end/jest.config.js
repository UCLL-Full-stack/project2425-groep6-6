const nextJest = require('next/jest');

// Creëer de Jest configuratie met de juiste instellingen voor Next.js
const createJestConfig = nextJest({
  dir: './', // Zorg ervoor dat je de juiste pad naar je Next.js project opgeeft
});

// Custom configuratie voor Jest
const customJestConfig = {
  preset: 'next/jest', // Gebruik de Next.js preset
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Laad extra matchers voor Testing Library
  testEnvironment: 'jest-environment-jsdom', // Stel de testomgeving in op jsdom
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Zoek naar bestanden met test of spec
  moduleDirectories: ['node_modules'], // Zorg ervoor dat node_modules correct wordt gevonden
};

// Exporteer de samengestelde configuratie
module.exports = {
    preset: 'next/jest', // Gebruik de Next.js preset
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Laad extra matchers voor Testing Library
    testEnvironment: 'jest-environment-jsdom', // Stel de testomgeving in op jsdom
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Zoek naar bestanden met test of spec
    moduleDirectories: ['node_modules'], // Zorg ervoor dat node_modules correct wordt gevonden
  };
  