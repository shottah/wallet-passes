
/**
 * Decodes a base64 encoded string to a buffer.
 * @param payload - The base64 encoded string to decode.
 * @returns The decoded buffer.
 */
export const decodeBase64ToBuffer = (payload: string) => {
  return Buffer.from(payload, 'base64');
};