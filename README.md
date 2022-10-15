# generate-ts

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) [![NPM](https://nodei.co/npm/generate-ts.png?mini=true)](https://npmjs.org/package/generate-ts)

The purpose of this repository is to provide a simple, **Typescript native** way to dynamically generate Typescript code based on a pattern.

### Getting started

Typescript version ^4.8.4 needs to be installed globally via:

```bash
npm install -g typescript
```

Then you can simply run this package via an `npx` command:

```bash
npx generate-ts
```

It will pick up any `<NAME>.generator.json` files in your project and generate patterns based on their properties.

### How to structure the generator.json files

Create some json files with the name `<NAME>.generator.json` and structure them like so:

```json
{
  "filePath": "src/Example/test.ts", <-- the path and name of the file to be generated
  "fileNamePattern": ".screen.ts",   <-- the pattern for the files that you want to apply a code pattern to
  "codePatterns": [                  <-- the pattern(s) to be applied to the files found via the fileNamePattern property
    "import { $nameScreen } from './$importName';", <-- you can just insert a simple string pattern using the API's variables
    {
      "documentation": "Example pattern block", <-- (optional) patterns can have custom documentation placed at the beginning of a code block
      "prePattern": "const example = () => {",  <-- (optional) patterns can have code that is placed before the pattern block
      "pattern": "const $name = 'thing';",      <-- pattern that will be run on each file found
      "postPattern": "}"                        <-- (optional) patterns can have code that is placed after the pattern block
    }
  ]
}
```

Run `npx generate-ts`, and the resulting `test.ts` file will look like this:

```typescript
import { ExampleScreen } from './Example.screen';
import { SecondScreen } from './Second.screen';

// Example pattern block
const example = () => {
  const Example = 'thing';
  const Second = 'thing';
};
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

#### Using the library programmatically

You can install this package and use it programmatically instead of using `npx`:

```typescript
npm install generate-ts
```

And then use it like so:

```typescript
import { generatePattern, GeneratePatternOptions } from 'generate-ts';

const options: GeneratePatternOptions = {
  filePath: 'src/Example/test.ts',
  fileNamePattern: '.screen.ts',
  codePatterns: [
    "import { $nameScreen } from './$importName';",
    {
      documentation: 'Example pattern block',
      prePattern: 'const example = () => {',
      pattern: "const $name = 'thing';",
      postPattern: '}',
    },
  ],
};

generatePattern(options);
```

### Motivation

Over a year ago I wrote a [blog post](https://www.bravolt.com/post/generate-index-can-save-your-sanity) going over how the [vscode-generate-index](https://github.com/fjc0k/vscode-generate-index) plugin has helped solve a lot of tedious problems we may face in the Typescript world. However, if I wasn't following my own advice about [continuous improvement](https://www.bravolt.com/post/how-to-adopt-a-continuous-improvement-culture), I would have never thought to start working on this project.

The **vscode-generate-index** plugin has been helpful in the short-term. However, in the **long-term** we identified several issues that this plugin's approach created. Here is a breakdown of the problems we faced, and how this project solves them:

| vscode-generate-index                                                                                                                                                                            | Typescript-Code-Generation                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Creating and maintaining the patterns is cumbersome. The patterns exist as single line comments                                                                                                  | Patterns are defined with simple, overt syntax. Documentation is also encouraged and can be added to each pattern block easily                                                                                           |
| Onboarding new developers creates learning curve issues. They need to learn the [minimatch](https://github.com/isaacs/minimatch#usage) pattern, and the `@index` flag syntax, among other things | API is interacted with via native Typescript. In fact, the entire backend is run via the Typescript Compiler API                                                                                                         |
| Makes it too easy/tempting to combine with manual code, adding to confusion                                                                                                                      | Each code generation result is placed in its own file, overwriting itself on each invocation                                                                                                                             |
| When not left in check, creates monolithic generated files                                                                                                                                       | While any file can become monolithic, this project makes it difficult because it is not possible to have different **file searches** in the same output, only different **patterns** as a result of a single file search |
| No type safety or compiler checks until after the code is generated                                                                                                                              | The resulting code from each pattern is run through the native Typescript compiler API, and any errors and type issues are outputted to the console and blocks generation of the file                                    |
