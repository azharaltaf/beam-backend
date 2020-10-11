const axios = require('axios'),
    searchDao = require('../dao/SearchDao');

module.exports = {
    search: async function (searchDto) {
        console.log(`Hello.. ${JSON.stringify(searchDto)}`)
        return await searchDao.search(searchDto)
    },
}