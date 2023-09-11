import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as crypto from 'crypto';

const baseClave = process.env.SECRET_KEY
console.log(process.env)
console.log(baseClave)
const claveSecreta = crypto.createHash('sha256').update(baseClave, 'utf8').digest();

const descifrar = (text: string): string => {
    let textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', claveSecreta, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}


export function cargarCredencialesGoogle(): void {
    const credencialesCifradas = process.env.GOOGLE_APPLICATION_ENCRYPT

    if (!credencialesCifradas) {
        throw new Error("No se encontraron las credenciales cifradas de Google.");
    }

    // Descifra las credenciales
    const credenciales = descifrar(credencialesCifradas);

    // Crea un archivo temporal para las credenciales
    const tempFilePath = join(tmpdir(), 'gptongue-4ec5feae5289.json');
    writeFileSync(tempFilePath, credenciales);

    // Asigna la ruta del archivo temporal a la variable que Google espera
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tempFilePath;
}
