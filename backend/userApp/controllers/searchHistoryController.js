const SearchHistory = require('../models/searchHistoryModel');

exports.getSimpleSearchHistory  = (req, res, next) => {
    console.log("GET HISTORIQUE")
    SearchHistory.find({ user : req.params.user })
        .then( (sh) => { 
            res.status(200).json(sh);
        })
        .catch( (error) => { 
            res.status(400).json({ error: error });
        });
  };


  const addSimpleSearchHistory  = (req, res, next) => {
    //console.log("HISTORY SAVED");
    const searchHistory = new SearchHistory({ 
        user : req.params.user,
        username : req.body.username,
        filters : new Array(req.body.searchText),
    }) 

    searchHistory.save()
    .then( () => { 
        //console.log("HISTORY SAVED");
            res.status(200).json({ message : "Simple search history ajoute avec succes pour cet user." });
        })
    .catch( (error) => { 
            res.status(400).json({ error: error });
        });
  };

  exports.updateSimpleSearchHistory  = (req, res, next) => {
    //console.log("HISTORY SAVED");
    SearchHistory.find({user : req.params.user})
    .then( (sh) => {
        let isKeywordPresent = false, i=0;
        if(sh.length > 0)
        {
            for(let el of sh[0].filters)
            {
                if(el == req.body.searchText)
                {
                    isKeywordPresent = true;
                    break;
                }
                i++
            }

            let update_tmp = sh[0].filters
            if(!isKeywordPresent)
            {
                update_tmp.push(req.body.searchText) 
                SearchHistory.updateOne({ user : req.params.user }, {filters : update_tmp})
                .then( () => { 

                        res.status(200).json({ message : "Simple search history mis a jour avec succes pour cet user." });
                    })
                .catch( (error) => { 
                        res.status(400).json({ error: error, message:"Message survenu lors de lajout de l'historique" });
                });
            }
            else
            {
                res.status(200).json({ message : "Ce keyword existe deja pour cet user." });

            }
        }else
        {
            addSimpleSearchHistory(req, res, next)
        }
            
    })
    .catch( (error) => { 
        res.status(400).json({ error: error });
    });

  };



  exports.removeSimpleSearchHistory  = (req, res, next) => {
    SearchHistory.find({ user : req.params.user })
    .then( (sh) => {
        let newSh = []
        for (let i in sh[0].filters)
        {
            let el = sh[0].filters[i]
            if(el != req.body.searchText)
            {
               newSh.push(el)
            }
        }
        console.log("REMOVE HIST")
        SearchHistory.updateOne({ user : req.params.user },  { filters : newSh })
                    .then(
                        () => {
                            res.status(200).json({ message: 'Product removed from user Historique list.'});
                        })
                    .catch((error) => { res.status(400).json({error : error}); }); 
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };

exports.removeAllSimpleSearchHistory = (req, res, next) =>{
    console.log("REMOVE ALL HIST")
    
    SearchHistory.updateOne({user:req.params.user}, {filters:[]})
        .then(() => {
                res.status(200).json({ message: 'All Historiques removed.'});
         })
        .catch((error) => { res.status(400).json({error : error}); }); 
  }
  
  
