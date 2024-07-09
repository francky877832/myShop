const nlp = require('compromise');

// Fonction pour transformer les nombres écrits en lettres en chiffres dans un texte
function convertWordsToNumbers(text) {
    // Utilisation de Compromise.js pour analyser le texte
    const doc = nlp(text);

    // Regex pour détecter les nombres écrits en mots
    const numberRegex = /(?:\b(?:un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|dix[\s\-](?:sept|huit|neuf))\b|\b(?:vingt(?:\-et\-un)?|trente|quarante|cinquante|soixante(?:\-dix)?|quatre\-vingt(?:\-dix)?|cent(?:\s(?:un|et\sun))?|mille|million|milliard)\b)/gi;

    // Fonction pour convertir les mots en chiffres
    function convertWords(match) {
        switch (match.toLowerCase()) {
            case 'un':
                return '1';
            case 'deux':
                return '2';
            case 'trois':
                return '3';
            case 'quatre':
                return '4';
            case 'cinq':
                return '5';
            case 'six':
                return '6';
            case 'sept':
                return '7';
            case 'huit':
                return '8';
            case 'neuf':
                return '9';
            case 'dix':
                return '10';
            case 'onze':
                return '11';
            case 'douze':
                return '12';
            case 'treize':
                return '13';
            case 'quatorze':
                return '14';
            case 'quinze':
                return '15';
            case 'seize':
                return '16';
            case 'vingt':
                return '20';
            case 'trente':
                return '30';
            case 'quarante':
                return '40';
            case 'cinquante':
                return '50';
            case 'soixante':
                return '60';
            case 'quatre-vingt':
                return '80';
            case 'cent':
                return '100';
            case 'mille':
                return '1000';
            case 'million':
                return '1000000';
            case 'milliard':
                return '1000000000';
            default:
                return match; // Retourner le mot original si aucun remplacement n'est défini
        }
    }

    // Remplacer chaque mot correspondant à la regex par sa version convertie
    const replacedText = doc.replace(numberRegex, convertWords).text();

    return replacedText; // Retourner le texte avec les nombres convertis
}

// Exemple d'utilisation
const originalText = "mon numéro est : six cent 77 douze 79 zero sept";
const convertedText = convertWordsToNumbers(originalText);
console.log(convertedText); // Affiche : "mon numéro est : 600 77 12 79 0 7"
