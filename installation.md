installation and setup
npm init -y
npm install express
npm install typescript ts-node @types/node @types/express --save-de

npx tsc --init

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts"
}

.gitignore
# Node.js dependencies
node_modules/

# TypeScript compiled output
dist/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env

# TypeScript cache
*.tsbuildinfo

# Miscellaneous
.DS_Store