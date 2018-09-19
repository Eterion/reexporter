import { Options } from 'types';
import { Options as Params } from 'yargs';

export const eol: string = '\r\n';

export const comments: string = [].map(comment => comment + eol).join('');

export const params: { [key: string]: Params } = {
  fileExtension: {
    alias: 'e',
    default: 'js',
    desc: 'Determines file extension of the generated index file.',
    type: 'string',
  },
  fileExtensionInPath: {
    default: false,
    desc:
      'If set to true, file extension will be added to path of index file. This option is relevant only when recursion is enabled.',
    type: 'boolean',
  },
  fileName: {
    alias: 'n',
    default: 'index',
    desc: 'File name of generated index file.',
    type: 'string',
  },
  fileNameInPath: {
    default: false,
    desc:
      'If set to true, file name will be added to path of index file. This option is relevant only when recursion is enabled.',
    type: 'boolean',
  },
  ignore: {
    alias: 'i',
    default: [],
    desc:
      'List of ignored file names. Strings that start and end with forward slash are interpreted as regular expressions. Regular expressions are tested on file names, including file extension.',
    type: 'array',
  },
  log: {
    alias: 'l',
    default: false,
    desc: 'Outputs log messages when files are manipulated.',
    type: 'boolean',
  },
  moduleExtension: {
    alias: 'me',
    default: 'js',
    desc: 'File extension of modules that should be detected.',
    type: 'string',
  },
  moduleExtensionInPath: {
    default: false,
    desc: 'If set to true, adds file extension to module paths.',
    type: 'boolean',
  },
  moduleTemplate: {
    alias: 'mt',
    default: "export { default as #name } from '#path';",
    desc: 'Template for detected module.',
    type: 'string',
  },
  recursion: {
    alias: 'r',
    default: false,
    desc:
      'Enables recursion. This means child directories with detected modules will be added to index files as well.',
    type: 'boolean',
  },
  recursionTemplate: {
    alias: 'rt',
    default: "import * as #name from '#path';",
    desc: 'Template for recursion import, added to the beginning of file.',
    type: 'string',
  },
  recursionTemplateExport: {
    alias: 'rte',
    default: 'export { #recursion };',
    desc: 'Template for recursion export, added to the end of file.',
    type: 'string',
  },
  sort: {
    alias: 's',
    choices: ['alpha', 'alpha-desc'],
    default: 'alpha',
    desc: 'Determines sorting of exported modules.',
    type: 'string',
  },
  test: {
    default: false,
    desc: "Enables test mode, which doesn't manipulate any files.",
    type: 'boolean',
  },
};

export const options: Options = Object.keys(params).reduce(
  (object: Options, param) =>
    Object.assign(object, { [param]: params[param].default }),
  {}
);
