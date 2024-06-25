
exports.sinceDate = (_date) => {
    const date2 = new Date(_date)
    const date = Date.now() - date2
    console.log(date2)
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
        comments[i]==true ? newComments.push(comments[i]) : false
        let subComment = []
        for(let j in comments)
        {
            if(i != j)
            {
                if(comments[i] != undefined && comments[j] != undefined)
                {
                    if(comments[i].id_ == comments[j].id)
                    {
                        comments[j] = {...comments[j], subComment : true}
                    }
                    else
                    {
                        comments[j] = {...comments[j], subComment : false}
                    }
                }
            }
        } 
    }
    return comments;
}