const logRequests = (req, res, next) => {
    const localDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    if (req.userId) {
        // Gera log de requisições do usuário autenticado por ID
        console.log(`[${localDate}] O Usuário id ${req.userId} fez uma requisição para ${req.method} ${req.originalUrl}`);
    } else {
        // Gera log de requisições anônimas
        console.log(`[${localDate}] Requisição anônima para ${req.method} ${req.originalUrl}`);
    };
    next();
}

module.exports = logRequests;