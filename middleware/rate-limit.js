const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure délai de vérification des demandes.
    max: 5, // Nombre de tentative après envoie de l'erreur 429 sur l'IP.
    message: 'Trop de comptes créés à partir de cette adresse IP, veuillez réessayer après une heure !'
})

module.exports = rateLimit(createAccountLimiter);