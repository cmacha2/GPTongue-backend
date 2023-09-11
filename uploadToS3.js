const AWS = require("aws-sdk");
const fs = require("fs");

// Configuración de AWS
AWS.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    // Asegúrate de no dejar tus credenciales en el código. Es mejor utilizar variables de entorno o AWS Secrets Manager.
});

// Instancia de S3
const s3 = new AWS.S3();

// Lee el contenido del archivo
const fileContent = fs.readFileSync('/Users/cmacha2/Desktop/gptongue-backend/apikeyGoogle/gptongue-4ec5feae5289.json');

// Parámetros para S3
const params = {
    Bucket: "cyclic-fuzzy-moth-battledress-us-east-2",
    Key: "google_credentials/gptongue-4ec5feae5289.json",
    Body: fileContent,
    ServerSideEncryption: "AES256"  // Esto habilita el cifrado del lado del servidor
};

// Subir archivo a S3
s3.upload(params, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(`Archivo subido exitosamente a ${data.Location}`);
});
