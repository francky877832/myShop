const fs = require('fs');
const path = require('path');


exports.deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Erreur lors de la suppression du fichier : ${err.message}`);
        reject(err);
      } else {
        console.log(`Fichier supprimé avec succès : ${absolutePath}`);
        resolve();
      }
    });
  });
};
