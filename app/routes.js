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
router.post('/version-1/add-court-case/outcome', function(req, res) {

    var knownOutcomeCode = req.session.data['known-outcome-code']

    console.log("knownOutcomeCode:" + knownOutcomeCode)

    if (knownOutcomeCode == "yes") {
        res.redirect('/version-1/add-court-case/check-answers')
    }
})



module.exports = router