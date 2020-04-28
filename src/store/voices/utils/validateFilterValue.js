import isNil from 'lodash.isnil';

const MIN_LENGTH = 3;

/**
 * Check if the value is a valid filter word
 *
 * @param {string} value - The value to check
 * @returns {boolean} - The validation flag
 */
export default function validateFilterValue(value) {
  if (isNil(value)) {
    return false;
  }

  if (value === '') {
    return false;
  }

  if (value.length < MIN_LENGTH) {
    return false;
  }

  return true;
}
