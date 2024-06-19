const Preference = require('../models/preferenceModel');


//create or update, hasPreferencesIn
exports.addUserPreferences = (req, res, next) => {
            const preference = new Preference(
                    {
                        user : req.body.user,
                        preferences : req.body.preferences
                    })
            preference.save()
                    .then(
                        () => {
                            res.status(200).json({message : "Preference utilisateur ajoutee avec succes."});
                        })
                    .catch((error) => { 
                        res.status(400).json({error : error}); 
                    })
}

exports.updateUserPreferences = (req, res, next) => {
    
    Preference.find({user : req.body.user})
    .then(
        (preferences) => 
        {
            let isCatPresent = false
            for(let el of preferences[0].preferences)
            {
                if(el.category == req.body.preferences[0].category)
                {
                    isCatPresent = true;
                    break; 
                }
            }
           
            if(!isCatPresent)
            {
                let pref = preferences
                pref[0].preferences.push({category : req.body.preferences[0].category})
                Preference.updateOne({ user : req.body.user },  { preferences : pref[0].preferences })
                    .then(
                        () => {
                            res.status(200).json({message : "Preference utilisateur mise a jour avec succes."});
                    })
                    .catch((error) => { res.status(400).json({error : error}); });     
            }
            else
            {
                res.status(200).json({message : "Cette categorie existe deja dans les preferences de cet user."});
            }

              
        })
        .catch((error) => { res.status(400).json({error : error}); });
}



exports.getUserPreferences = (req, res, next) => {
    Preference.find({user : req.params.id})
    .then(
        (preferences) => {
            res.status(200).json(preferences);
        })
    .catch((error) => { res.status(400).json({error : error}); });
}

