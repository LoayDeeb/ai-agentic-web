import classNames from 'classnames';

/**
 * Utility function for merging classNames
 * Combines multiple className strings/objects into a single string
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return classNames(inputs);
}

