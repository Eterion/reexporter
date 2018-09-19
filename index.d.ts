interface Fs {
  action: 'add' | 'idle' | 'update' | 'remove';
  message: string;
}

interface Module {
  isRecursion?: boolean;
  name: string;
  path: string;
}

interface Options {
  fileExtension?: string;
  fileExtensionInPath?: boolean;
  fileName?: string;
  fileNameInPath?: boolean;
  ignore?: (string | RegExp)[];
  log?: boolean;
  moduleExtension?: string;
  moduleExtensionInPath?: boolean;
  moduleTemplate?: string;
  pragma?: string[];
  recursion?: boolean;
  recursionTemplate?: string;
  recursionTemplateExport?: string;
  sort?: 'alpha' | 'alpha-desc';
  test?: boolean;
}

export default function(patterns?: string | string[], options?: Options): void;
