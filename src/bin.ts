import { params } from 'const';
import reexporter from 'index';
import { Options } from 'types';
import * as yargs from 'yargs';
const args = yargs.options(params).argv;
reexporter(args._.length ? args._ : '', args as Options);
