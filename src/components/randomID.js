// Sử dụng trong mã nguồn Node.js
const { customAlphabet } = require('nanoid');

// Định nghĩa bộ mã chứa số từ 0 đến 9 và các chữ cái
// const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Tạo hàm sinh ID với bộ mã đã định nghĩa và độ dài là 6
const generateId = customAlphabet(alphabet, 8);

module.exports = { generateId };