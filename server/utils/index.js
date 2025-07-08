const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("invalid-email@"));    // false

module.exports = { isValidEmail }