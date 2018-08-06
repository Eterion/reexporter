[![Npm](https://img.shields.io/npm/v/reexporter.svg?style=flat-square)](https://www.npmjs.com/package/reexporter)
[![Build Status](https://img.shields.io/travis/Eterion/reexporter/master.svg?style=flat-square)](https://travis-ci.org/Eterion/reexporter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Reexporter

A package that simply generates index file with ES6 default exports based on
detected file structure. Support custom templates for export code, so this
package can be used to summarize basically anything you want, if you provide
correct template.

Intall with your favorite package manager with access to npm registry.

```
$ yarn add reexporter
```

## Contents

- [Node Api](#node-api)
- [CLI](#cli)
- [Options](#options)
- [Templates](#templates)

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

```
$ reexporter <node-glob> [options]
```

## Options

These options are identical for both, node api and cli.

### fileExtension

- Type: `string`
- Default: `js`

Determines file extension of the generated index file.

### fileExtensionInPath

- Type: `boolean`
- Default: `false`

If set to true, file extension will be added to path of index file. This option
is relevant only when [recursion](#recursion) is enabled.

### fileName

- Type: `string`
- Default: `index`

File name of generated index file.

### fileNameInPath

- Type: `boolean`
- Default: `false`

If set to true, file name will be added to path of index file. This option is
relevant only when [recursion](#recursion) is enabled.

### ignore (experimental)

- Type: `(string | RegExp)[]`
- Default: `[]`

List of ignored file names. Strings that start and end with forward slash are
interpreted as regular expressions. **This options is experimental, probably
doesn't work properly.**

### log

- Type: `boolean`
- Default: `false`

Outputs log messages when files are manipulated.

### moduleExtension

- Type: `string`
- Default: `js`

File extension of modules that should be detected.

### moduleExtensionInPath

- Type: `boolean`
- Default: `false`

If set to true, adds file extension to module paths.

### moduleTemplate

- Type: `string`
- Default: `export { default as #name } from '#path';`

Template for detected module.

### recursion

- Type: `boolean`
- Default: `false`

Enables recursion.

### recursionTemplate

- Type: `string`
- Default: `import * as #name from '#path';`

Template for recursion import.

### recursionTemplateExport

- Type: `string`
- Default: `export { #recursion };`

Template for recursion export.

### test

- Type: `boolean`
- Default: `false`

Enables test mode, which doesn't manipulate any files.

## Templates

Custom templates can be used to modify generated file contents. There's a total
of three available templates.

### Placeholders

| Placeholder  | Description                         |
| ------------ | ----------------------------------- |
| `#name`      | Module name, resolved from path.    |
| `#path`      | Path to module.                     |
| `#recursion` | List of modules separated by comma. |

### Availability

| Template                  | Available Placeholders |
| ------------------------- | ---------------------- |
| `moduleTemplate`          | `#name`, `#path`       |
| `recursionTemplate`       | `#name`, `#path`       |
| `recursionTemplateExport` | `#recursion`           |
