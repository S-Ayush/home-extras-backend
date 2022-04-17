/**
 * @param {string} mimeType
 * @param {Buffer} buffer
 * @return {Promise<string>}
 */
export const bufferToDataUri = (mimeType, buffer) => {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
};
