const jwt = require("jsonwebtoken");
const SECRET = "productManagement";

// Função para gerar o token
const generateToken = (payload) => {
    const options = { expiresIn: 300 };
    return jwt.sign(payload, SECRET, options);
};

module.exports = generateToken;