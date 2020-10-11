var searchService = require('../services/SearchService');

module.exports = {
    search: async function (req, res) {
        try {
            let vehicles = await searchService.search(req.body)
            res.status(200).send(vehicles)
         } catch (error) {
             res.status(500).send({error: true, message: error.message})
         }
    }
}