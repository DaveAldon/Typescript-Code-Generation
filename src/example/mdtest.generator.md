filePath
`src/example/test.ts`

fileNamePattern
`.screen.ts`

codePatterns

```TypeScript
import { $nameScreen } from './$importName'; // pattern
```

```TypeScript
const test = () => {
  // variable assignment
  const $nameVariable = "$name"; // pattern
  return {
    $nameVariable, // pattern
  };
};
```
