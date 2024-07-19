import nlp from "compromise";
const Fuse = require('fuse.js');

exports.capitalizeFirstLetter = str => str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;

exports.sinceDate = (_date) => {
    const date2 = new Date(_date)
    const date1 = new Date()
    const date = date1.getTime() - date2.getTime()
    //console.log(date1)
    //console.log(Date.now() + " - " + date2.getTime() + " = " + date)
    let oneDay = 1000 * 60 * 60 * 24

    let years = Math.floor(date/(oneDay*365))
    let months = Math.floor(date/(oneDay*30))
    let weeks = Math.floor(date/(oneDay*7))
    let days = Math.floor(date/oneDay)
    let hours = Math.floor(date/(oneDay/24))
    let minutes = Math.floor(date/(oneDay/(24*60)))
    let seconds = Math.floor(date/(oneDay/60*60*24))

    
    if(years != 0)
        return [isNaN(years)?0:years, years==1 ? "an" : "ans"]
    else if(months != 0)
        return [isNaN(months)?0:months, "mois"]
    else if(weeks != 0)
        return [isNaN(weeks)?0:weeks, weeks==1 ? "semaine" : "semaines"]
    else if(days != 0)
        return [isNaN(days)?0:days, days==1 ? "jour" : "jours"]
    else if(hours != 0)
        return [isNaN(hours)?0:hours, hours==1 ? "heure" : "heures"]
    else if(minutes != 0)
        return [isNaN(minutes)?0:minutes, minutes==1 ? "minute" : "minutes"]
    else
        return [isNaN(seconds)?0:seconds, (seconds==1 || seconds==0) ? "seconde" : "secondes"]

}

exports.truncateText = (text, numChars, clicked=false) => {
    if(text.length > numChars)
        return [text.substring(0, numChars+1), 1, clicked]
    else
        return [text.substring(0, numChars+1), 0, clicked]
}

exports.displayComment = (comments) => {
    
    return true
}

exports.reshapeComments = (datas) => {
    let comments = [...datas]
    let newComments = []
    for(let i in comments)
    {
        let subComment = []
        let j = i
        for( j in comments)
        {
            if(i != j)
            {
                if(comments[i] != undefined && comments[j] != undefined)
                {
                    if(comments[i]._id == comments[j].isResponseTo)
                    {
                        subComment.push(comments[j])
                        comments[i] = {...comments[i], subComment : subComment}
                        //comments.splice(j, 1)
                        delete comments[j]
                    }
                }
            }
        }
       // console.log(i)     
    }
    for(let j in comments)
        if(comments[j] != undefined)
            newComments.push(comments[j])
    return newComments;
}


exports.formatMoney = (m) => {
    let money = [];
    let money_separator = '.'
    let m_tmp = m.toString().split('')
    let money_reverse = []
    for(let j=m_tmp.length-1;j>=0;j--)
    {
        if(m_tmp[j] != money_separator)
        {
            money_reverse.push(m_tmp[j])
        }
    }
    for(let i in money_reverse)
    {
            if(money_reverse[i] != money_separator)
            {
                money.push(money_reverse[i])
            }
        if((i+1)%3 == 0 && i != money_reverse.length-1)
        {
            money.push(money_separator)
        }
    }
    return money.reverse().join('')
}

exports.countDatas = (datas) => {
    let count = 0

    for(let i of datas)
    {
        count += 1;
        if(Array.isArray(i))
        {
            count += i.length;
        }
    }
    return count;
}


exports.reshapeBasketProducts = (p) => {
    const products = [...p]

}



const serialize = (obj, prefix) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];
        if (v !== null && typeof v === 'object') {
          str.push(serialize(v, k));
        } else {
          str.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
      }
    }
    return str.join('&');
  }
exports.serialize = serialize


// Fonction pour transformer les nombres écrits en lettres en chiffres dans un texte
exports.convertWordsToNumbers = (text) => {
    // Utilisation de Compromise.js pour analyser le texte
        const comment = new String(text);
        //console.log(doc)
    // Regex pour détecter les nombres écrits en mots
    const numberRegex = /(?:\b(?:zero|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|dix[\s\-](?:sept|huit|neuf))\b|\b(?:vingt(?:\-et\-un)?|trente|quarante|cinquante|soixante(?:\-dix)?|quatre\-vingt(?:\-dix)?|cent(?:\s(?:un|et\sun))?|mille|million|milliard)\b)/gi;

    // Fonction pour convertir les mots en chiffres
    function convertWords(match) {
        switch (match.toLowerCase()) {
            case 'zero':
                return '0';
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
                return match;
        }
    }

    // Remplacer chaque mot correspondant à la regex par sa version convertie
    const replacedText = comment.replace(numberRegex, convertWords);
    //console.log(replacedText)

    function findNumbers(input) {
        const text = input.replace(/[^a-zA-Z0-9]/g, '');
        console.log(text)
        const longNumberRegex = /\d{7,}/g;
        const matches = text.match(longNumberRegex);
//console.log(matches)
        if (matches) {
            //console.log("Plus de 7")
            return false;
        } else {
            return true;
        }
    }
    
    //const inputString = "123-456789/123456 78abc123 1234567";
    const result = findNumbers(replacedText);
    
    //console.log("Nombres trouvés:", result.numbers);
    /*if (result.errors.length > 0) {
        console.error("Erreurs:", result.errors.join(', '));
    }*/

    return result; // Retourner le texte avec les nombres convertis
}

exports.containsEmail = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    return emailRegex.test(text);
}




exports.getSearchedProducts = async (filters, products) => {
    const { name, customFilters } = filters;
    let result;
        if(!name)
        {
          result = products
          //console.log("vide")
        }
        else
        {
          const fuse = new Fuse(products, {
          keys: ['name', 'description', 'category'],
          threshold: 0.5, // Ajustez ce seuil selon vos besoins
          });
    
          // Effectuer la recherche floue
          result = fuse.search(name).map(result => result.item);
    
          //comme FUSE JS ne conserve pas l'ordre, utiliser la memoire de tri
            result.sort((a, b) => a.sortIndex - b.sortIndex);
        }
        //console.log(result)
        
        // Appliquer des filtres personnalisés si nécessaire
        let filteredResult = result;
        //console.log(customFilters.minPrice)
        if (customFilters.categories?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.categories.includes(product.category));
        }
        if (customFilters.brands?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.brands.includes(product.brand));
        }
        if (customFilters.condition?.length > 0) {
          filteredResult = filteredResult.filter(product => customFilters.condition.includes(product.condition));
        }
        if (customFilters.minPrice) {
          filteredResult = filteredResult.filter(product => customFilters.minPrice <= product.price);
        }
        if (customFilters.maxPrice) {
          filteredResult = filteredResult.filter(product => customFilters.maxPrice >= product.price);
        }
    
        return filteredResult
}





