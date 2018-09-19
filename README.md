[![Npm](https://img.shields.io/npm/v/reexporter.svg?style=flat-square)](https://www.npmjs.com/package/reexporter)
[![Build Status](https://img.shields.io/travis/Eterion/reexporter/master.svg?style=flat-square)](https://travis-ci.org/Eterion/reexporter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Reexporter

A package that simply generates index file with ES6 default exports based on
detected file structure. Supports custom templates for export code, so this
package can be used to summarize basically anything you want, if you provide
correct template.

Intall with your favorite package manager with access to npm registry.

```bash
# npm
npm install reexporter --save-dev

# yarn
yarn add reexporter --dev
```

## Contents

- [Node Api](#node-api)
- [CLI](#cli)
- [Templates](#templates)
- [Options](#options)
- [Example](#example)

## Node Api

Provides default export method, which accepts two arguments. First is
[node-glob](https://github.com/isaacs/node-glob) string (or array of strings),
second is for [options](#options).

```ts
import reexporter from 'reexporter';
reexporter(<node-glob>[, options]);
```

## CLI

Provides the same functionality as node api.

```bash
reexporter <node-glob> [options]
```

## Templates

Custom templates can be used to determine generated file contents. Placeholders
`#n` are used for replacement values.

- `#eol` - End of line shortcut (available in [pragma](#pragma))
- `#name` - Module name, resolved from file name (available in
  [moduleTemplate](#moduletemplate), [recursionTemplate](#recursiontemplate))
- `#path` - Path to module (available in [moduleTemplate](#moduletemplate),
  [recursionTemplate](#recursiontemplate))
- `#recursion` - List of modules, separated by comma (available in
  [recursionTemplateExport](#recursiontemplateexport))

## Options

These options are identical for both, node api and cli.

```bash
reexporter --help
```

- [fileExtension](#fileextension)
- [fileExtensionInPath](#fileextensioninpath)
- [fileName](#filename)
- [fileNameInPath](#filenameinpath)
- [ignore](#ignore)
- [log](#log)
- [moduleExtension](#moduleextension)
- [moduleExtensionInPath](#moduleextensioninpath)
- [moduleTemplate](#moduletemplate)
- [pragma](#pragma)
- [recursion](#recursion)
- [recursionTemplate](#recursionTemplate)
- [sort](#sort)
- [test](#test)

### fileExtension

- Type: `string`
- Default: `js`
- Alias: `e`

Determines file extension of the generated index file.

### fileExtensionInPath

- Type: `boolean`
- Default: `false`

If set to true, file extension will be added to path of index file. This option
is relevant only when [recursion](#recursion) is enabled.

### fileName

- Type: `string`
- Default: `index`
- Alias: `n`

File name of generated index file.

### fileNameInPath

- Type: `boolean`
- Default: `false`

If set to true, file name will be added to path of index file. This option is
relevant only when [recursion](#recursion) is enabled.

### ignore

- Type: `(string | RegExp)[]`
- Alias: `i`

List of ignored file names. Strings that start and end with forward slash are
interpreted as regular expressions. Regular expressions are tested on file
names, including file extension.

### log

- Type: `boolean`
- Default: `false`
- Alias: `l`

Outputs log messages when files are manipulated.

### moduleExtension

- Type: `string`
- Default: `js`
- Alias: `me`

File extension of modules that should be detected.

### moduleExtensionInPath

- Type: `boolean`
- Default: `false`

If set to true, adds file extension to module paths.

### moduleTemplate

- Type: `string`
- Default: `export { default as #name } from '#path';`
- Alias: `mt`

Template for detected module.

### pragma

- Type: `string[]`
- Alias: `p`

Adds any kind of string at the start of index file. Each item in array will be
included on separate line. Use `#eol` placeholder to manually include end of
line.

### recursion

- Type: `boolean`
- Default: `false`
- Alias: `r`

Enables recursion. This means child directories with detected modules will be
added to index files as well.

### recursionTemplate

- Type: `string`
- Default: `import * as #name from '#path';`
- Alias: `rt`

Template for recursion import, added to the beginning of file.

### recursionTemplateExport

- Type: `string`
- Default: `export { #recursion };`
- Alias: `rte`

Template for recursion export, added to the end of file.

### sort

- Type: `alpha | alpha-desc`
- Default: `alpha`
- Alias: `s`

Determines sorting of exported modules.

### test

- Type: `boolean`
- Default: `false`

Enables test mode, which doesn't manipulate any files.

## Example

Given the following file structure:

```
.
├─ modules
|   ├─ moduleA
|   |   └─ a.js
|   ├─ moduleB
|   |   └─ b.js
|   ├─ bar.js
|   ├─ baz.js
|   └─ foo.js
├─ package.json
└─ ...
```

Running the following cli command:

```bash
reexporter modules/**/* --recursion
```

Will generate index files with the following contents:

```js
// modules/moduleA/index.js
export { default as a } from './a';
```

```js
// modules/moduleB/index.js
export { default as b } from './b';
```

```js
// modules/index.js
import * as moduleA from './moduleA';
import * as moduleB from './moduleB';
export { default as bar } from './bar';
export { default as baz } from './baz';
export { default as foo } from './foo';
export { moduleA, moduleB };
```
