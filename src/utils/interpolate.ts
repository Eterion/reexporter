import hasProperty from 'utils/hasProperty';

interface IData {
  [index: string]: any;
}

/**
 * Returns string template, where `{n}` patterns are replaced with data values.
 * Data can be provided either as list of string values (patterns represent
 * index in array), or as data object (patterns represent property keys).
 *
 * @param {string} template String template.
 * @param {string[]|object} data Data object or list of data values.
 */

export default function(template: string, data?: string[] | IData): string {
  if (Array.isArray(data)) {
    data.forEach(() => {
      template = template.replace(/#(\d+)/g, (_match, $1) => {
        return data[$1] || `#${$1}`;
      });
    });
  } else {
    if (data) {
      Object.keys(data).forEach(key => {
        template = template.replace(
          new RegExp(`#${key}`, 'g'),
          hasProperty(data, key) ? data[key].toString() : `#${key}`
        );
      });
    }
  }
  return template;
}
