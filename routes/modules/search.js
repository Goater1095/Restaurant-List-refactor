const express = require('express')
const router = express.Router()
const Rest = require('../../models/restaurant')

//set route
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Rest.find()
    .lean()
    .then((rests) => {
      const searchResult = rests.filter(
        (rest) => rest.name.toLowerCase().includes(keyword) && rest.category.toLowerCase().includes(keyword)
      )
      res.render('index', { resList: searchResult, keyword })
      console.log(location.href)
    })
    .catch((error) => console.error(error))
})

module.exports = router
