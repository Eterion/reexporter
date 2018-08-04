interface Callback extends Fs {
  content: string;
  modules: Module[];
}

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
  recursion?: boolean;
  recursionTemplate?: string;
  recursionTemplateExport?: string;
  test?: boolean;
}

export default function(
  paths?: string | string[],
  options?: Options
): Promise<Callback[]>;
