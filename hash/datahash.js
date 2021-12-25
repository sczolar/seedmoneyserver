import CryptoJS from "crypto-js";

// Encrypt
export const Encrypt = (data) => {
  var hash = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();
  return hash;
};

// Decrypt
export const Decrypt = (hash) => {
  try {
    var bytes = CryptoJS.AES.decrypt(hash, "secret key 123");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return { Error: `${error.message}` };
  }
};
