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

// type of document route
// version 3 add-a-remand-warrant
router.post('/version-3/add-a-document/type-of-document-selected', function(req, res) {

    var typeOfDocument = req.session.data['type-of-document']

    console.log("type-of-document:" + typeOfDocument)

    if (typeOfDocument == "remand-warrant") {
        res.redirect('/version-3/add-a-document/add-a-remand-warrant/add-a-remand-warrant')
    }
})

// add another offence choice
// version 3 add-an-offence
router.post('/version-3/add-an-offence/add-another-offence-selected', function(req, res) {

    var addAnotherOffence = req.session.data['add-another-offence-choice']

    console.log("add-another-offence-choice" + addAnotherOffence)

    if (addAnotherOffence == "yes") {
        res.redirect('/version-3/add-an-offence/add-an-offence')
    }
        if (addAnotherOffence == "no") {
        res.redirect('/version-3/add-an-offence/check-answers')
    }
})

// // add another offence choice
// // version 3 add-an-offence
// router.post('version-3/add-an-offence/add-another-offence-selected', function(req, res) {

//     var addAnotherOffenceChoice = req.session.data['add-another-offence-choice']

//     console.log("addAnotherOffenceChoice:" + addAnotherOffenceChoice)

//     if (addAnotherOffenceChoice == "yes") {
//         res.redirect('version-3/add-an-offence/add-an-offence')
//     }
// })

module.exports = router