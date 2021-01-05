import { hash, compare } from 'bcrypt';
import { BCRYPT_SALT } from '../../environments';

/**
 * @description creates hash of password
 * @param password
 */
export const hashPassword = async (password): Promise<string> => {
  return await hash(password, BCRYPT_SALT);
};

/**
 * @description compares hash with password
 * @param hash
 * @param password
 */
export const comparePassword = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
