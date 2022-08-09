const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Court name route
router.post('/version-1/add-court-case/do-you-know-the-name-of-the-court', function(req, res) {

    var knownCourtName = req.session.data['do-you-know-the-name-of-the-court']

    console.log("knownCourtName:" + knownCourtName)

    if (knownCourtName == "yes") {
        res.redirect('/version-1/add-court-case/search-by-name')
    }
})

// Outcome type route
router.post('/version-3/add-a-document/type-of-document-selected', function(req, res) {

    var typeOfDocument = req.session.data['type-of-document']

    console.log("type-of-document:" + typeOfDocument)

    if (typeOfDocument == "remand-warrant") {
        res.redirect('/version-3/add-a-document/add-a-remand-warrant/add-a-remand-warrant')
    }
})

// //Type of document route
// router.post('/version-3/add-a-document/type-of-document', function(req, res) {

//     var typeOfDocument = req.session.data['type-of-document']

//     console.log("typeOfDocument:" + typeOfDocument)

//     if (typeOfDocument == "remand-warrant") {
//         res.redirect('/version-3/add-a-document/add-a-remand-warrant')
//     }
// })

module.exports = router