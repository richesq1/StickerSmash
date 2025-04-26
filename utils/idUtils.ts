/**
 * Generates a unique identifier string
 * @returns A unique string ID
 */
export function generateUniqueId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }