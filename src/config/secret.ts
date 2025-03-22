/**
 * Passphrase for the pass keyphrase key. This is used to sign the pass.
 * @dev This is a secret value and should not be exposed.
 */
export const PASS_KEYPHRASE = process.env.PASS_KEYPHRASE;

/**
 * PEM certificate for the pass.
 * @dev This is a secret value and should not be exposed.
 */
export const PEM_CERTIFICATE_BASE64 = process.env.PEM_CERTIFICATE_BASE64;

/**
 * PEM key for the pass.
 * @dev This is a secret value and should not be exposed.
 */
export const PEM_KEY_BASE64 = process.env.PEM_KEY_BASE64;

/**
 * PEM WWRD for the pass.
 * @dev This is a secret value and should not be exposed.
 */
export const PEM_WWRD_BASE64 = process.env.PEM_WWRD_BASE64;
