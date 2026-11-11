// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

declare global {
  interface String {
    /**
     * @brief Converts the string to camelCase (e.g., "Hello World" -> "helloWorld").
     * @return The camelCased version of the string.
     */
    toCamelCase(): string;

    /**
     * @brief Converts the string to PascalCase (e.g., "hello world" -> "HelloWorld").
     * @return The PascalCased version of the string.
     */
    toPascalCase(): string;

    /**
     * @brief Converts the string to kebab-case (e.g., "Hello World" -> "hello-world").
     * @return The kebab-cased version of the string.
     */
    toKebabCase(): string;

    /**
     * @brief Checks if the entire string is in lowercase.
     * @return True if the string is lowercase, false otherwise.
     */
    isLowerCase(): boolean;

    /**
     * @brief Checks if the entire string is in uppercase.
     * @return True if the string is uppercase, false otherwise.
     */
    isUpperCase(): boolean;

    /**
     * @brief Checks if the string is in PascalCase format.
     * @return True if strictly PascalCase, false otherwise.
     */
    isPascalCase(): boolean;

    /**
     * @brief Checks if the string is in camelCase format.
     * @return True if strictly camelCase, false otherwise.
     */
    isCamelCase(): boolean;

    /**
     * @brief Checks if the string is in kebab-case format.
     * @return True if strictly kebab-case, false otherwise.
     */
    isKebabCase(): boolean;
  }
}

String.prototype.toKebabCase = function (): string {
  return (
    this.toString()
      // Insert a hyphen between lowercased/number characters and uppercased characters
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Replace all spaces, underscores, and multiple hyphens with a single hyphen
      .replace(/[\s_]+/g, '-')
      // Convert the entire result to lowercase
      .toLowerCase()
  );
};

String.prototype.toCamelCase = function (): string {
  // Use toKebabCase as a normalizer, then convert hyphens to capital letters
  return this.toKebabCase().replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
};

String.prototype.toPascalCase = function (): string {
  const camel = this.toCamelCase();

  if (!camel) return '';

  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

String.prototype.isLowerCase = function (): boolean {
  return this.toString() === this.toLowerCase();
};

String.prototype.isUpperCase = function (): boolean {
  return this.toString() === this.toUpperCase();
};

String.prototype.isKebabCase = function (): boolean {
  return this.toString() === this.toKebabCase();
};

String.prototype.isCamelCase = function (): boolean {
  return this.toString() === this.toCamelCase();
};

String.prototype.isPascalCase = function (): boolean {
  return this.toString() === this.toPascalCase();
};

export {};
