const crypto = require('crypto');
const fs = require("fs");

const baseClave = 'GPTongueCmacha2Dev';
const claveSecreta = crypto.createHash('sha256').update(baseClave, 'utf8').digest();

// Función para cifrar
const cifrar = (text) => {
    const iv = crypto.randomBytes(16);  // Genera un IV aleatorio
    const cipher = crypto.createCipheriv('aes-256-cbc', claveSecreta, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return `${iv.toString('hex')}:${crypted}`;  // Devuelve IV:cifrado
}

const descifrar = (text) => {
    let textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', claveSecreta, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}

const contenido = fs.readFileSync('/Users/cmacha2/Desktop/gptongue-backend/apikeyGoogle/gptongue-4ec5feae5289.json', 'utf-8');
const contenidoCifrado = cifrar(contenido);
console.log(contenidoCifrado);
