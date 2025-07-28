//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const sessionDataDefaults = require("./data/session-data-defaults");
const router = govukPrototypeKit.requests.setupRouter();


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
//Special remission - question
router.post('/special-remission-submit', function (req, res) {
    //this
    var srselect = req.session.data['srselect']
   // Check whether the variable matches a condition
    if (srselect == "Yes"){
    // Send user to next page
      res.redirect('/adjustments/beta/17/special-remission/special-remission-days')
    } else {
      // Send user to homepage
      res.redirect('/adjustments/beta/17/special-remission/special-remission-required')
    }
   })
//Record immigration
router.post('/record-submit', function (req, res) {
    // this
    var recordDocument = req.session.data['recordDocument']
   // Check whether the variable matches a condition
    if (recordDocument == "IS91"){
    // Send user to next page
    res.redirect('/adjustments/beta/18/immigration-detention/is91-date-issued')}
    else {
    // Send user to deportation order questions
    res.redirect('/adjustments/beta/18/immigration-detention/do-date-issued')
    }
  })
  //Immigration update status
router.post('/status-update-submit', function (req, res) {
    // this
    var statustype = req.session.data['statustype']
   // Check whether the variable matches a condition
    if (statustype == "Active"){
    // Send user to next page
    res.redirect('/adjustments/beta/18/immigration-detention/active-confirmation')}
    else {
    // Send user to deportation order questions
    res.redirect('/adjustments/beta/18/immigration-detention/inactive-confirmation')
    }
  })
//TSCA
router.post('/tsca-question-submit', function (req, res) {
    // this
    var tscaselect = req.session.data['tscaselect']
   // Check whether the variable matches a condition
    if (tscaselect == "Yes"){
    // Send user to next page
    res.redirect('/adjustments/beta/mvp-plus/TSCA/tsca-days')}
    else {
    // Send user to ppcs question
    res.redirect('/adjustments/beta/mvp-plus/TSCA/tsca-question-ppcs')
    }
  })
//PPCS
router.post('/tsca-question-ppcs-submit', function (req, res) {
    // this
    var ppscselect = req.session.data['ppscselect']
   // Check whether the variable matches a condition
    if (ppscselect == "Yes"){
    // Send user to next page
    res.redirect('/adjustments/beta/mvp-plus/TSCA/tsca-ppcs-days')}
    else {
    // Send user to ppcs question
    res.redirect('/adjustments/beta/mvp-plus/TSCA/tsca-cannot-continue')
    }
  })
//TSPANC
router.post('/time-spent-appeal-question-submit', function (req, res) {
    // this
    var appealselect = req.session.data['appealselect']
   // Check whether the variable matches a condition
    if (appealselect == "Yes"){
    // Send user to next page
    res.redirect('/adjustments/beta/mvp-plus/tspanc/time-spent-appeal-days')}
    else {
    // Send user to ppcs question
    res.redirect('/adjustments/beta/mvp-plus/tspanc/time-spent-appeal-cannot-continue')
    }
  })


//convert date to words
function monthToWord (monthNum){
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[monthNum - 1]
  
    console.log("Month name: " + month);
  
    return month;
  }

  router.post('/accept-reject-remand-question', function(request, response) {

    var contact = request.session.data['contact']
    if (contact == "phone"){
        response.redirect("adjustments/beta/17/remand-tool/check-your-answers-rejected-remand")
    }  
    else {
        response.redirect("adjustments/beta/17/remand-tool/view-remand")
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
