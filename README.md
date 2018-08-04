[![Npm](https://img.shields.io/npm/v/reexporter.svg?style=flat-square)](https://www.npmjs.com/package/reexporter)
[![Build Status](https://img.shields.io/travis/Eterion/reexporter/master.svg?style=flat-square)](https://travis-ci.org/Eterion/reexporter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Reexporter

A package that simply generates a file with ES6 default exports based on
detected file structure. Install with your favorite package manager with access
to npm registry.

```
$ yarn add reexporter
```

## Options

### fileExtension

- Type: `string`
- Default: `'js'`

### fileExtensionInPath

- Type: `boolean`
- Default: `false`

### fileName

- Type: `string`
- Default: `'index'`

### fileNameInPath

- Type: `boolean`
- Default: `false`

### ignore

- Type: `(string | RegExp)[]`
- Default: `[]`

### log

- Type: `boolean`
- Default: `false`

### moduleExtension

- Type: `string`
- Default: `'js'`

### moduleExtensionInPath

- Type: `boolean`
- Default: `false`

### moduleTemplate

- Type: `string`
- Default: `'export { default as #name } from '#path';'`

### recursion

- Type: `boolean`
- Default: `false`

### recursionTemplate

- Type: `string`
- Default: `'import * as #name from '#path';'`

### recursionTemplateExport

- Type: `string`
- Default: `export { #recursion };`

### test

- Type: `boolean`
- Default: `false`
