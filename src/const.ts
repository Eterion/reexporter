import { Options } from 'types';
import { Options as Params } from 'yargs';

export const eol: string = '\r\n';

export const comments: string = [].map(comment => comment + eol).join('');

export const params: { [key: string]: Params } = {
  fileExtension: {
    default: 'js',
    type: 'string',
  },
  fileExtensionInPath: {
    default: false,
    type: 'boolean',
  },
  fileName: {
    default: 'index',
    type: 'string',
  },
  fileNameInPath: {
    default: false,
    type: 'boolean',
  },
  ignore: {
    default: [],
    type: 'array',
  },
  log: {
    default: false,
    type: 'boolean',
  },
  moduleExtension: {
    default: 'js',
    type: 'string',
  },
  moduleExtensionInPath: {
    default: false,
    type: 'boolean',
  },
  moduleTemplate: {
    default: "export { default as #name } from '#path';",
    type: 'string',
  },
  recursion: {
    default: false,
    type: 'boolean',
  },
  recursionTemplate: {
    default: "import * as #name from '#path';",
    type: 'string',
  },
  recursionTemplateExport: {
    default: 'export { #recursion };',
    type: 'string',
  },
  test: {
    default: false,
    type: 'boolean',
  },
};

export const options: Options = Object.keys(params).reduce(
  (object: Options, param) =>
    Object.assign(object, { [param]: params[param].default }),
  {}
);
