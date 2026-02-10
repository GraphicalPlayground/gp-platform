/**
 * @brief Represents an object that can be extracted.
 * @description An extractable object can be any object with string keys and values of any type.
 */
type Extractable =
  | {
      [key: string]: any;
    }
  | undefined;

/**
 * @brief Converts an object into a JSON string.
 * @description Returns an empty string if the object is not extractable or if a circular reference is detected during stringification.
 * @param obj - The object to convert into a dependency string.
 * @returns A JSON string representation of the object or an empty string if conversion fails.
 * @example
 * objectToDeps({ key: 'value' }); // returns '{"key":"value"}'
 * objectToDeps(undefined); // returns ""
 */
export function objectToDeps(obj: Extractable) {
  // Check if the object is extractable
  if (!obj || typeof obj !== 'object') {
    return '';
  }

  // Attempt to convert the object to a JSON string
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '';
  }
}
