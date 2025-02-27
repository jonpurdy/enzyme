// Transaction Fees

const LENGTH_PUBLICKEY = 32 + 1; // publicKey + prefix
const LENGTH_SIGNATURE = 64;
const LENGTH_ERA = 1;
export const SIGNATURE_SIZE = LENGTH_PUBLICKEY + LENGTH_SIGNATURE + LENGTH_ERA;

// Transaction Types

export const TRANSFER_COINS = 'TRANSFER_COINS';

// Status
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';
export const MINIMUM_BALANCE = '130000000000000';
