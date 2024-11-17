const jwt = require("jsonwebtoken");
const SECRET = "productManagement";

// Função para gerar o token
const generateToken = (payload) => {
    const options = { expiresIn: 3600 };
    return jwt.sign(payload, SECRET, options);
};

module.exports = generateToken;