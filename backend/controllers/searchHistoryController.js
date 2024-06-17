const SearchHistory = require('../models/searchHistoryModel');

exports.getSimpleSearchHistory  = (req, res, next) => {
    SearchHistory.find({ user : req.body.user })
        .then( (sh) => { 
            res.status(200).json(sh);
        })
        .catch( (error) => { 
            res.status(400).json({ error: error });
        });
  };


  exports.addSimpleSearchHistory  = (req, res, next) => {
    const searchHistory = new SearchHistory({ 
        user : req.body.user,
        filters : [{ keyword : req.body.name }]
    }) 

    searchHistory.save()
    .then( () => { 
        console.log("ok");
            res.status(200).json({ message : "Simple search history ajoute avec succes pour cet user." });
        })
    .catch( (error) => { 
            res.status(400).json({ error: error });
        });
  };

  exports.updateSimpleSearchHistory  = (req, res, next) => {
    SearchHistory.find({user : req.body.user})
    .then( (sh) => {
        let isKeywordPresent = false, i=0;
        for(let el of sh[0].filters)
        {
            if(el.keyword == req.body.name)
            {
                isKeywordPresent = true;
                break;
            }
            i++
        }

        let update_tmp = sh[0].filters
        if(!isKeywordPresent)
        {
            update_tmp.push({ keyword : req.body.name }) 
            SearchHistory.updateOne({ user : req.body.user }, {filters : update_tmp})
            .then( () => { 
                    res.status(200).json({ message : "Simple search history mis a jour avec succes pour cet user." });
                })
            .catch( (error) => { 
                    res.status(400).json({ error: error });
            });
        }
        else
        {
            res.status(200).json({ message : "Ce keyword existe deja pour cet user." });

        }
          
    })
    .catch( (error) => { 
        res.status(400).json({ error: error });
    });

  };



  exports.removeSimpleSearchHistory  = (req, res, next) => {
    SearchHistory.find({ user : req.body.user })
    .then( (sh) => {
        let newSh = []
        for (let i in sh[0].filters)
        {
            let el = sh[0].filters[i]
            if(el.keyword != req.body.name)
            {
               newSh.push(sh[0].filters[i] )
            }
        }
        SearchHistory.updateOne({ user : req.body.user },  { filters : newSh })
                    .then(
                        () => {
                            res.status(200).json({ message: 'Product removed from user favourite list.'});
                        })
                    .catch((error) => { res.status(400).json({error : error}); }); 
     })
    .catch( (error) => { 
        res.status(400).json({ error: error });
     });
  };
  
  
