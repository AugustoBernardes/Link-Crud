const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

router.use(methodOverride('_method'))
const linkControler = require('../controllers/linkController')

// Get routes
router.get('/', linkControler.allLinks)
router.get('/add', (req,res) => res.render('add', {error:false, body:{}}))
router.get('/:title', linkControler.redirect )
router.get('/edit/:id', linkControler.loadLink)


// Post routes
router.post('/', express.urlencoded({ extended: true }), linkControler.addLink )
router.post('/edit/:id', express.urlencoded({ extended: true }), linkControler.editLink )

// Delete routes
router.delete('/:id', linkControler.deleteLink)
router.delete('/', express.urlencoded({ extended: true }), linkControler.deleteLink)

// Notes
// urlenconder is used to acess the body content

module.exports = router