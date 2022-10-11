# Typescript-Code-Generation

The purpose of this repository is to provide a simple way to generate typescript code based on a pattern.

While [ts-morph](https://github.com/dsherret/ts-morph/tree/latest/packages/ts-morph) is the leading library for most of this type of work, this repo seeks to find a pure, dependency-free solution.

### Getting Started

1. Install dependancies: `npm i`
2. Run the code: `npm run start`

Currently, this code will generate a file in the `src` directory, with some simple code defined in the `compiler.ts` file. It also checks the code for errors before writing it to the file.

### WIP Research

These are the resources I've been using to piece this together for the time-being, before it's in a completely working state:

https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#user-content-creating-and-pr

https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services

https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/#altering-or-creating-code-programmatically
