import CryptoJS from "crypto-js";

// 🔑 Generate key from user password
export const generateKey = (password) => {
  return CryptoJS.SHA256(password).toString();
};

// 🔐 Encrypt
export const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

// 🔓 Decrypt
export const decryptData = (cipher, key) => {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};