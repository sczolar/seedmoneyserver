import CryptoJS from "crypto-js";

const pin = "av1234";
// Encrypt
export const Encrypt = (data) => {
  var hash = CryptoJS.AES.encrypt(JSON.stringify(data), pin).toString();
  return hash;
};

// Decrypt
export const Decrypt = (hash, key) => {
  try {
    var bytes = CryptoJS.AES.decrypt(hash, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return { Error: `${error.message}` };
  }
};
