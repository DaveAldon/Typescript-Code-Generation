# Typescript-Code-Generation

The purpose of this repository is to provide a simple, **Typescript native** way to dynamically generate Typescript code based on a pattern.

Over a year ago I wrote a [blog post](https://www.bravolt.com/post/generate-index-can-save-your-sanity) going over how the [vscode-generate-index](https://github.com/fjc0k/vscode-generate-index) plugin has helped solve a lot of tedious problems we may face in the Typescript world. However, if I wasn't following my own advice about [continuous improvement](https://www.bravolt.com/post/how-to-adopt-a-continuous-improvement-culture), I would have never thought to start working on this project.

The **vscode-generate-index** plugin has been helpful in the short-term. However, in the **long-term** we identified several issues that this plugin's approach created. Here is a breakdown of the problems we faced, and how this project solves them:

| vscode-generate-index                                                       | Typescript-Code-Generation                                                                                                                                                                                               |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Creating and maintaining the patterns is cumbersome                         | Patterns are defined with simple, overt syntax. Documentation is also encouraged and can be added to each pattern block easily                                                                                           |
| Onboarding new developers creates learning curve issues                     | API is interacted with via native Typescript. In fact, the entire backend is run via the Typescript Compiler API                                                                                                         |
| Makes it too easy/tempting to combine with manual code, adding to confusion | Each code generation result is placed in its own file, overwriting itself on each invocation                                                                                                                             |
| When not left in check, creates monolithic generated files                  | While any file can become monolithic, this project makes it difficult because it is not possible to have different **file searches** in the same output, only different **patterns** as a result of a single file search |
| No type safety or compiler checks until after the code is generated         | The resulting code from each pattern is run through the native Typescript compiler API, and any errors and type issues are outputted to the console and blocks generation of the file                                    |

### Getting Started

1. Install dependancies: `npm i`
2. Run the code: `npm run start`

Currently, this code will generate a file in the `src/Example` directory, with some simple code defined in the `src/CodeGenerator/index.ts` file. It also checks the code for errors before writing it to the file.

### How to use it

Call on the generator command like so:

```typescript
import { generatePattern } from './compiler/generatePattern';

generatePattern({
  filePath: 'src/Example/test.ts', // full path to the file that will be generated
  fileNamePattern: `.screen.ts`, // the pattern that will be used to search for files, typically an extension
  codePatterns: [
    `import { $nameScreen } from './$importName';`, // a pattern can be just a string
    { pattern: `const $name = "thing";`, documentation: `Variable assignment` }, // or a pattern can be an object with a pattern and documentation that will be presented at the beginning of its output block
  ],
});
```

The resulting `test.ts` file will look like this:

```typescript
import { ExampleScreen } from './Example.screen';
import { SecondScreen } from './Second.screen';

// Variable assignment
const Example = 'thing';
const Second = 'thing';
```

### API

#### Pattern Variables

| Variable    | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| $name       | Gets the first section of the file name: "MyScreen"                          |
| $fileName   | Gets the entire file name: "MyScreen.screen.ts"                              |
| $importPath | Gets the file path without the last extension: "src/screens/MyScreen.screen" |
| $path       | Gets the full path: "src/screens/MyScreen.screen.ts"                         |

#### Options

| Property | Type              | Description                                                    |
| -------- | ----------------- | -------------------------------------------------------------- |
| folder   | string (optional) | Limits file search to a provided directory. Defaults to `'./'` |

### WIP Research

These are the resources I've been using to piece this together for the time-being, before it's in a completely working state:

https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#user-content-creating-and-pr

https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services

https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/#altering-or-creating-code-programmatically
