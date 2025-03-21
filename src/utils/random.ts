import crypto from 'crypto';
import { SERIAL_NUMBER_LENGTH } from '@/config/public';

/**
 * Generates a random serial number for the pass.
 * @returns {string} The serial number.
 */
export const generateSerial = () => {
  return crypto.randomBytes(SERIAL_NUMBER_LENGTH).toString('hex');
};