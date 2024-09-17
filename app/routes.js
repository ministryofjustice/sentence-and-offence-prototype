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

// add another offence choice
// version 3 add-a-warrant/add-an-offence
router.post('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/add-another-offence-selected', function(req, res) {

    var addAnotherOffence = req.session.data['add-another-offence-choice']

    console.log("add-another-offence-choice" + addAnotherOffence)

    if (addAnotherOffence == "yes") {
        res.redirect('/version-3/add-an-offence/add-an-offence')
    }
    if (addAnotherOffence == "no") {
        res.redirect('/version-3/add-a-document/add-a-remand-warrant/check-answers')
    }
})

router.post('/version-3/add-a-document/add-a-remand-warrant/hearing-type', function(req, res) {

    var nextHearingMonth = req.session.data['next-hearing-date-month']
    
    var date = monthToWord(nextHearingMonth);

    console.log("Next hearing month: " + date);

    req.session.data['next-hearing-date-month'] = date;

    res.redirect('/version-3/add-a-document/add-a-remand-warrant/hearing-type');

})

router.post('/version-3/add-a-document/add-a-remand-warrant/submit-court-date', function(req, res) {

    var courtDateMonth = req.session.data['court-date-month']
    
    var date = monthToWord(courtDateMonth);

    console.log("Court date month: " + date);

    req.session.data['court-date-month'] = date;

    res.redirect('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/add-an-offence');

})



router.post('/version-3/add-an-offence/offence-end-date', function(req, res) {

    var offenceStartDate = req.session.data['offence-start-month']
    
    var date = monthToWord(offenceStartDate);

    console.log("Offence start month: " + date);

    req.session.data['offence-start-month'] = date;

    res.redirect('/version-3/add-an-offence/offence-end-date');

})


router.post('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/offence-end-date', function(req, res) {

    var offenceStartDate = req.session.data['offence-start-month']
    
    var date = monthToWord(offenceStartDate);

    console.log("Offence start month: " + date);

    req.session.data['offence-start-month'] = date;

    res.redirect('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/offence-end-date');

})

router.post('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/add-another-offence', function(req, res) {

    var offenceEndDate = req.session.data['offence-end-month']
    
    var date = monthToWord(offenceEndDate);

    console.log("Offence end month name: " + date);

    req.session.data['offence-end-month'] = date;

    res.redirect('/version-3/add-a-document/add-a-remand-warrant/add-an-offence/add-another-offence');

})


// add another offence choice
// version 3 add-a-warrant-for-custodial-sentence/add-a-sentence
router.post('/version-3/add-a-document/add-a-warrant-for-custodial-sentence/add-a-sentence/add-another-sentence-selected', function(req, res) {

    var addAnotherOffence = req.session.data['add-another-offence-choice']

    console.log("add-another-offence-choice" + addAnotherOffence)

    if (addAnotherOffence == "yes") {
        res.redirect('/version-3/add-a-document/add-a-warrant-for-custodial-sentence/add-a-sentence/add-an-offence')
    }
    if (addAnotherOffence == "no") {
        res.redirect('/version-3/add-a-document/add-a-warrant-for-custodial-sentence/check-answers')
    }
})




//convert date to words

function monthToWord (monthNum){

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = months[monthNum - 1]

  console.log("Month name: " + month);

  return month;
}


//special remissions - question
router.post('/adjustments/beta/mvp-plus/special-remission/special-remission-question', function(req, res) {
    var activatecreate = req.session.data['activatecreate'];
    if (activatecreate == "yes"){
      res.redirect('/adjustments/beta/mvp-plus/special-remission/special-remission-days');
    }
    else if (activatecreate == "no"){
      res.redirect('/adjustments/beta/mvp-plus/special-remission/special-remission-required');
    }
  });


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