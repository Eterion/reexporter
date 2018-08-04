/**
 * Checks for properties in provided object and returns true if all properties
 * exist. Return false if any of the requested properties is not found. This
 * method could possibly be replaced by optional chaining feature when (and if)
 * implemented, https://github.com/tc39/proposal-optional-chaining
 *
 * @param {object} object Object.
 * @param {string[]} keys List of properties.
 */

export default function(object: any, ...keys: string[]): boolean {
  const list: string[] = [];
  keys.forEach(key => {
    key.split('.').forEach(keyItem => {
      list.push(keyItem);
    });
  });
  while (list.length) {
    const key = list.shift();
    if (!object.hasOwnProperty(key)) return false;
    if (key) object = object[key];
  }
  return true;
}
