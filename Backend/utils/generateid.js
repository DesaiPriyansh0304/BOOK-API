const { v4: uuidv4 } = require("uuid");

const generateUniqueId = (prefix) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  return `${prefix}${timestamp}_${uniqueId}`;
};

module.exports = { generateUniqueId };
