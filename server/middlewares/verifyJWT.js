const jwt = require("jsonwebtoken");
const SECRET = "productManagement";

// Função para verificar JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];

    // Verifica se o token foi preenchido
    if (!token) {
        return res.status(401).send({ message: "Token não fornecido." });
    }

    // Verifica se o token é válido
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: "Token inválido!" });
        }

        req.userId = decoded.userId; // Adiciona o ID do usuário na requisição
        next();
    });
};

module.exports = verifyJWT;