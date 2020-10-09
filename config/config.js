// Secreto
process.env.SECRET = process.env.SECRET || '$canchas';
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Puerto
process.env.PORT = process.env.PORT || 3000;
// url mongoose
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/sportmeeting';
} else {
    // urlDB = 'mongodb+srv://santiago:M9pME1YVp452BArv@cluster0-vzhhn.mongodb.net/Motor'
}
process.env.URLBD = urlDB;

// contraseña de mongo
//M9pME1YVp452BArv