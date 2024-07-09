

exports.capitalizeFirstLetter = str => str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;

exports.sinceDate = (_date) => {
    const date2 = new Date(_date)
    const date = Date.now() - date2.getTime()
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
        return [years, years==1 ? "an" : "ans"]
    else if(months != 0)
        return [months, "mois"]
    else if(weeks != 0)
        return [weeks, weeks==1 ? "semaine" : "semaines"]
    else if(days != 0)
        return [days, days==1 ? "jour" : "jours"]
    else if(hours != 0)
        return [hours, hours==1 ? "heure" : "heures"]
    else if(minutes != 0)
        return [minutes, minutes==1 ? "minute" : "minutes"]
    else
        return [seconds, seconds==1 ? "seconde" : "secondes"]

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
        console.log(i)     
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
