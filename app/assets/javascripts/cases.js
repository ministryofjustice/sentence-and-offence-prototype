
document.addEventListener("DOMContentLoaded", () => {
  let emptyArray = [];
  //localStorage.setItem('cases', emptyArray)

  let cases = localStorage.getItem('cases');
  cases = cases ? JSON.parse(cases) : [];

  let offences = localStorage.getItem('offences');
  offences = offences ? JSON.parse(offences) : [];

  let documents = localStorage.getItem('documents');
  documents = documents ? JSON.parse(documents) : [];

  //data inputs
  //case details
  const courtName = document.getElementById('court-name');
  const courtDateDay = document.getElementById('court-date-day');
  const courtDateMonth = document.getElementById('court-date-month');
  const courtDateYear = document.getElementById('court-date-year');
  const courtCaseReference = document.getElementById('court-case-reference');
  const courtCaseType = document.getElementsByClassName('case-type');

  //sentence details
  const sentenceLengthYears = document.getElementById("sentence-length-years")
  const sentenceLengthMonths = document.getElementById("sentence-length-months")
  const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
  const sentenceLengthDays = document.getElementById("sentence-length-days")




  const nextCourtDay = document.getElementById("next-court-day")
  const nextCourtMonth = document.getElementById("next-court-month")
  const nextCourtYear = document.getElementById("next-court-year")
  const nextCourtTime = document.getElementById("next-court-time")
  const remandOutcome = document.getElementById("hearing-outcome")


  //remand

  //offence
  const offence = document.getElementById("offence-picker");
  const offenceDateDay = document.getElementById("offence-start-day");
  const offenceDateMonth = document.getElementById("offence-start-month");
  const offenceDateYear = document.getElementById("offence-start-year");
  const offenceEndDateDay = document.getElementById("offence-end-day");
  const offenceEndDateMonth = document.getElementById("offence-end-month");
  const offenceEndDateYear = document.getElementById("offence-end-year");
  const outcome = document.getElementById("outcome-picker");
  const outcomeItem = document.getElementsByClassName("outcome-picker-item")
  const offenceCount = document.getElementById("offence-count")

  //sentencing page
  const convictionDateDay = document.getElementById("conviction-day")
  const convictionDateMonth = document.getElementById("conviction-month")
  const convictionDateYear = document.getElementById("conviction-year")
  const sentenceType = document.getElementById("sentence-type")
  const sentenceDateDay = document.getElementById("sentence-date-day")
  const sentenceDateMonth = document.getElementById("sentence-date-month")
  const sentenceDateYear = document.getElementById("sentence-date-year")

  //DOm targets
  const OffenceListSummary = document.getElementById("OffenceListSummary")
  const OffenceOutcomeList = document.getElementById("OffenceOutcome")
  const caseDetailsContainer = document.getElementById("court-details")
  const caseListContainer = document.getElementById("case-list")
  const currentOffence = document.getElementById("this-sentence-detail")
  const caseDocumentsContainer = document.getElementById("caseDocumentsContainer")
  const pageTitle = document.getElementById("page-title")


  //let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);

  //lists
  const caseTypeRadios = document.getElementsByClassName('case-type')
  const offenceOutcomes = document.getElementsByClassName('outcome-sub-category')
  const remandOffenceOutcomes = document.getElementsByClassName('outcome-category')
  const addAnother = document.getElementsByClassName('add-another')
  const documentType = document.getElementsByClassName('document-type')
  const documentSource = document.getElementsByClassName('document-source')


  //buttons
  const caseDetailsSubmitButton = document.getElementById('case-details-button')
  const custodialDetailsSubmitButton = document.getElementById('custodial-details-button')
  const remandDetailsSubmitButton = document.getElementById('remand-details-button')
  const addAnOffenceButton = document.getElementById('add-an-offence-button')
  const addSentenceButton = document.getElementById('add-sentence-button2')
  const checkYourAnswersButton = document.getElementById('check-your-answers-button')
  const fileUploadButton = document.getElementById('fileUploadButton')
  const viewCaseLink = document.getElementsByClassName('viewCase')


  //helpers
  function radioRoute(radios) {
    for(let x of radios) {
      if(x.checked) {
        let route = x.getAttribute("data-route")
        location.href = `${route}.html`;
      }
    }
  }


  //html structures

  if (pageTitle) {
    let data = localStorage.getItem('activeCase')
    console.log(data)
    pageTitle.innerHTML = data
  }

  let custodialOutcomes = `
   <fieldset class="govuk-fieldset">
                                <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
                                    <h2 class="govuk-fieldset__heading">
                                        What was the outcome?
                                    </h2>
                                </legend>
                                <div class="govuk-radios" data-module="govuk-radios">
<!--                                    <div class="govuk-radios__item">-->
<!--                                        <input class="govuk-radios__input outcome-category" id="where-do-you-live" name="outcome" type="radio" value="Guilty" data-route="sentence-detail-3">-->
<!--                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live">-->
<!--                                            Guilty imprisonment-->
<!--                                        </label>-->
<!--                                        <div id="sign-in-item-hint" class="govuk-hint govuk-radios__hint">-->
<!--                                            This is when a case has resulted in a custodial sentence.-->
<!--                                        </div>-->
<!--                                    </div>-->
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="where-do-you-live-2" name="outcome" type="radio" value="guilty non custodial" data-route="offences-from-remand" data-aria-controls="guilty-nc">
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-2">
                                            Guilty
                                        </label>
                                        <div id="sign-in-item-hint" class="govuk-hint govuk-radios__hint">
                                            This includes community order,
                                            fine,
                                            conditional discharge or
                                            suspended imprisonment.
                                        </div>
                                    </div>
                                    <div class="govuk-radios__conditional" id="guilty-nc">
                                        <div class="govuk-form-group ">
                                            <label class="govuk-label" for="contact-by-email">
                                                Select the outcome
                                            </label>
                                            <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name" name="changed-name" type="radio" value="Imprisonment" data-route="add-a-sentence">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name">
                                                        imprisonment
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name" name="changed-name" type="radio" value="Community Order">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name">
                                                        Community Order
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Fine">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Fine
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Conditional discharge">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Conditional discharge
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Suspended Imprisonment">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Suspended Imprisonment
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="No separate penalty">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        No separate penalty
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="where-do-you-live-3" name="outcome" type="radio" value="Not-guilty" data-route="offences-from-remand" data-aria-controls="not-guilty">
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-3">
                                            Not Guilty
                                        </label>
                                        <div id="sign-in-item-hint" class="govuk-hint govuk-radios__hint">
                                            This includes
                                            dismissed,
                                            acquitted or
                                            discontinuance.
                                        </div>
                                    </div>
                                    <div class="govuk-radios__conditional" id="not-guilty">
                                        <div class="govuk-form-group ">
                                            <label class="govuk-label" for="contact-by-email">
                                                Select the outcome
                                            </label>
                                            <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name" name="changed-name" type="radio" value="Dismissed">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name">
                                                        Dismissed
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Acquitted">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Acquitted
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Discontinuance">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Discontinuance
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="outcome-4" name="outcome" type="radio" value="Other" data-route="offences-from-remand" data-aria-controls="other-options">
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-3">
                                            Other
                                        </label>
                                        <div id="sign-in-item-hint" class="govuk-hint govuk-radios__hint">
                                            This includes lie on file.
                                        </div>
                                    </div>
                                    <div class="govuk-radios__conditional" id="other-options">
                                        <div class="govuk-form-group ">
                                            <label class="govuk-label" for="contact-by-email">
                                                Select the outcome
                                            </label>
                                            <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">

                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Lie on file">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Lie on file
                                                    </label>
                                                </div>
                                                <div class="govuk-radios__item">
                                                    <input class="govuk-radios__input outcome-sub-category" id="changed-name-2" name="changed-name" type="radio" value="Not recorded on warrant">
                                                    <label class="govuk-label govuk-radios__label" for="changed-name-2">
                                                        Not recorded on warrant
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
  `
  let remandOutcomes = `
   <fieldset class="govuk-fieldset">
                                <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
                                    <h2 class="govuk-fieldset__heading">
                                        What was the outcome?
                                    </h2>
                                </legend>
                                <div class="govuk-radios" data-module="govuk-radios">
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="where-do-you-live-2" name="outcome" type="radio" value="Remand before conviction" >
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-2">
                                           Remand before conviction
                                        </label>
                                    </div>
                         
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="where-do-you-live-3" name="outcome" type="radio" value="Remand after convictiony" >
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-3">
                                           Remand after conviction
                                        </label>
                                    </div>
                                    <div class="govuk-radios__item">
                                        <input class="govuk-radios__input outcome-category" id="outcome-4" name="outcome" type="radio" value="Discontinued">
                                        <label class="govuk-label govuk-radios__label" for="where-do-you-live-3">
                                            Discontinued
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
  `

  let currentOffenceHTML = `
  <p>The details relate to the following offence:</p>
                    <strong>Offence: </strong> Intentionally obstruct an authorised person<br>
                    <strong>Date: </strong> 20 Jan 2022
  `

  function printSentence(days, weeks, months, years) {
    let d = days.value ? days.value : "0";
    let w = weeks.value ? weeks.value : "0";
    let m = months.value ? months.value : "0";
    let y = years.value ? years.value : "0";
    let sentence = ` ${y} years ${m} months ${w} weeks ${d} days `;
    console.log("y",sentence)
    if (sentence === '0 years 0 months 0 weeks 0 days') {
      return "Not recorded"
    } else {
      return sentence
    }

    //return sentence
  }
  function getRadioValue(option){

    const optionValue = option.length && option.find(c => c.checked).value;
    return optionValue

  }

  function getLastCase(caseList){
    //let amountOfItems = caseList.length
    const optionValue = caseList.length && caseList.find(c => parseInt(c.id) === caseList.length);
    return optionValue
  }
  function addCase(offence, offenceDate, offenceEndDate, outcome){
    let storedCases = localStorage.getItem('cases');
    storedCases = storedCases ? JSON.parse(storedCases) : []

    let offenceX = {
      offence: offence,
      offenceDate: offenceDate,
      offenceEndDate: offenceEndDate,
      outcome: outcome
    }
    localStorage.setItem('offence', JSON.stringify(offenceX))
    //updateData("offenceItem", offenceItem, offenceX);
    //console.log(offenceX);
  }

//update these to be one function
  function addNewDataItem(localStorageItem, dataItem){
    offences.push(dataItem)
    localStorage.setItem(localStorageItem, JSON.stringify(offences));
    //console.log("updated cases", JSON.parse(localStorage.getItem("cases")))
  }

  function addNewCase(localStorageItem, dataItem){
    cases.push(dataItem)
    localStorage.setItem(localStorageItem, JSON.stringify(cases));
    //console.log("updated cases", JSON.parse(localStorage.getItem("cases")))
  }
  function addNewDocument(localStorageItem, dataItem){
    documents.push(dataItem)
    localStorage.setItem(localStorageItem, JSON.stringify(documents));
    //console.log("updated cases", JSON.parse(localStorage.getItem("cases")))
  }


  function createDate(day, month, year) {
    let mNumber = parseInt(month.value);
    let monthName;
    switch (mNumber) {
      case 1:
        monthName = 'Jan';
        break;
      case 2:
        monthName = 'Feb';
        break;
      case 3:
        monthName = 'Mar';
        break;
      case 4:
        monthName = 'Apr';
        break;
      case 5:
        monthName = 'May';
        break;
      case 6:
        monthName = 'jun';
        break;
      case 7:
        monthName = 'Jul';
        break;
      case 8:
        monthName = 'Aug';
        break;
      case 9:
        monthName = 'Sep';
        break;
      case 10:
        monthName = 'Oct';
        break;
      case 11:
        monthName = 'Nov';
        break;
      case 12:
        monthName = 'Dec';
        break;
      default:
        monthName = 'Not recorded ';
    }

    let date = `${day.value} ${monthName} ${year.value}`;
    return date
  }

  if(caseDetailsSubmitButton){
    caseDetailsSubmitButton.addEventListener('click', function(e){
      let count = cases.length
      e.preventDefault()
      let courtCase = {
        id: count+1,
        court: courtName.value,
        date: createDate(courtDateDay, courtDateMonth, courtDateYear),
        reference: courtCaseReference.value,
        type: getRadioValue(Array.from(courtCaseType))
      }

      localStorage.setItem('activeCase', courtCaseReference.value);
      addNewCase('cases', courtCase)
      radioRoute(caseTypeRadios)

    })
  }

 if(custodialDetailsSubmitButton){
   console.log("cases", localStorage.getItem("cases"))
   console.log("offences", localStorage.getItem("offences"))
   let cases = JSON.parse(localStorage.getItem("cases"))
   let p = getLastCase(cases)
   console.log(p)
   console.log(cases)
   custodialDetailsSubmitButton.addEventListener('click', function(e){
      e.preventDefault()

      p.overallSentenceLength =  printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);
      localStorage.setItem('cases', JSON.stringify(cases))
      console.log('updated cases with osl', cases)
      location.href = 'add-an-offence.html'

   })
 }
 if(currentOffence){
   let p = getLastCase(offences)
   console.log(p)
     let currentOffenceInnerHTML = `
   <p>The details relate to the following offence:</p>
   <strong>Offence: </strong> ${p.name}<br>
   <strong>Count: </strong> ${p.count}<br>
   <strong>Date: </strong> ${p.startdate}
   `
   currentOffence.innerHTML += currentOffenceInnerHTML
 }
  function displayCaseData(p){
    if (p.type === 'remand') {
      let court = `<div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                        Court
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${p.court}
                    </dd>
                    <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href="warrant-details.html">
                            Change<span class="govuk-visually-hidden"> date</span>
                        </a>
                    </dd>
                </div>
                <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Court date
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.date}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Case reference
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.reference}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                   <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Case type
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.type}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Next court date
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.nextCourtDate}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Overall outcome
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.outcome}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="court-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                 `
      caseDetailsContainer.innerHTML += court;

    } else {
      let court = `<div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                        Court
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${p.court}
                    </dd>
                    <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href="warrant-details.html">
                            Change<span class="govuk-visually-hidden"> date</span>
                        </a>
                    </dd>
                </div>
                <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Court date
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.date}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Case reference
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.reference}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                   <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Case type
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.type}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Overall sentence length
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.overallSentenceLength}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="court-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                 `
      caseDetailsContainer.innerHTML += court;
    }
  }
  function getCase(caseRef){
    const activeCase =  cases.filter(x => x.reference === caseRef)
    return activeCase[0];
  }
 if(addAnOffenceButton){
   let cases = JSON.parse(localStorage.getItem("cases"))
   console.log(getLastCase(cases))
   let lastCase = getLastCase(cases)
   if (lastCase.type === 'remand') {
     OffenceOutcomeList.innerHTML += remandOutcomes
   } else {
     OffenceOutcomeList.innerHTML += custodialOutcomes
   }

  let outcome;
   addAnOffenceButton.addEventListener('click', function(e){
     e.preventDefault()
     if (lastCase.type === 'remand') {
        outcome = getRadioValue(Array.from(remandOffenceOutcomes))
     } else {
       outcome = getRadioValue(Array.from(offenceOutcomes))
     }

     let count = offences.length

     let offenceItem = {
       id: count+1,
       name:offence.value,
       count:offenceCount.value,
       startdate:createDate(offenceDateDay, offenceDateMonth, offenceDateYear),
       endDate:createDate(offenceEndDateDay, offenceEndDateMonth, offenceEndDateYear),
       outcome:outcome,
       case: lastCase.reference
     }
    addNewDataItem('offences', offenceItem)
     if(outcome === "Imprisonment") {
       location.href = 'add-a-sentence.html'
     }else {
       location.href = 'check-your-answers.html'
     }

   })
 }

 if(addSentenceButton) {
   let offences = JSON.parse(localStorage.getItem("offences"))
   console.log("offences", localStorage.getItem("offences"))
   let p = getLastCase(offences)
   console.log(p)
   addSentenceButton.addEventListener('click', function(e){
     e.preventDefault()

     let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);
     p.sentenceLength = sentenceLength
     p.sentenceType = sentenceType.value
     p.sentenceDate = createDate(sentenceDateDay, sentenceDateMonth, sentenceDateYear)
     console.log('with sentence',p)
     //update offences in local storage
     localStorage.setItem('offences', JSON.stringify(offences))

     //route to check answers
     location.href = 'check-your-answers.html'
   })
 }

  if(remandDetailsSubmitButton){
    console.log("cases", localStorage.getItem("cases"))
    let cases = JSON.parse(localStorage.getItem("cases"))
    console.log(cases)
    remandDetailsSubmitButton.addEventListener('click', function(e){
      e.preventDefault()
      let p = getLastCase(cases)
      p.nextCourtDate =  createDate(nextCourtDay, nextCourtMonth, nextCourtYear);
      p.nextCourtTime = nextCourtTime.value;
      p.outcome = remandOutcome.value
      localStorage.setItem('cases', JSON.stringify(cases))
      console.log('updated cases with remand', cases)
      location.href = 'add-an-offence.html'
  })
  }

  if (caseDetailsContainer) {
    let p = getCase(localStorage.getItem('activeCase'))
    let cases = JSON.parse(localStorage.getItem("cases"))
    displayCaseData(p)
  console.log(offences)
    let list = filterOffences(offences, p.reference)
//${printcc(x.cc, x.toOffence)}
    for(let x of list){
      if (p.type === 'remand'){
        displayRemandOffences(x)
      } else {
        displayCustodialOffences(x)
      }
    }

    checkYourAnswersButton.addEventListener('click',function(e){
      e.preventDefault()
      radioRoute(addAnother)
    })
  }

  function displayRemandOffences(x){
    let offence = ` 
 <div class="sentence-block ng">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Count ${x.count}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.name}
                      </h4>
                      <table class="govuk-table govuk-!-margin-right-4 govuk-!-margin-bottom-6 govuk-!-margin-bottom-0">
                          <tbody class="govuk-table__body">
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Outcome</th>
                                  <td class="govuk-table__cell">${x.outcome}</td>
                              </tr>
                                 <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Date</th>
                                  <td class="govuk-table__cell">${x.startdate}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                      <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                    </div>`
    OffenceListSummary.innerHTML += offence
  }
  function displayCustodialOffences(x){
    if(x.outcome === 'Imprisonment'){
      let offence = ` 
  <div class="sentence-block">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Count ${x.count}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.name}
                      </h4>
                      <p class="govuk-body-s">Committed on ${x.startdate}</p>
                      <table class="govuk-table govuk-!-margin-right-4 govuk-!-margin-bottom-6 govuk-!-margin-bottom-0">
                          <tbody class="govuk-table__body">
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Sentence type</th>
                                  <td class="govuk-table__cell">${x.sentenceType}</td>
                              </tr>
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Sentence date</th>
                                  <td class="govuk-table__cell">${x.sentenceDate}</td>
                              </tr>
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Offence sentence length</th>
                                  <td class="govuk-table__cell">${x.sentenceLength}
                                  </td>
                              </tr>
                              <tr class="govuk-table__row govuk-body-s firstcc">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Offence outcome</th>
                                  <td class="govuk-table__cell">${x.outcome}
                                  </td>
                              </tr>   
                              <tr class="govuk-table__row govuk-body-s firstcc">
                                  <th scope="row" class="govuk-table__header sentence-table-header">To be served</th>
                                  <td class="govuk-table__cell">
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      
                  </div>
                       <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                  </div>
          `
      OffenceListSummary.innerHTML += offence
    } else {
      let offence = ` 
  <div class="sentence-block">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Count ${x.count}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.name}
                      </h4>
                      <p class="govuk-body-s">Committed on ${x.startdate}</p>
                      <table class="govuk-table govuk-!-margin-right-4 govuk-!-margin-bottom-6 govuk-!-margin-bottom-0">
                          <tbody class="govuk-table__body">
                              <tr class="govuk-table__row govuk-body-s firstcc">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Offence outcome</th>
                                  <td class="govuk-table__cell">${x.outcome}
                                  </td>
                              </tr>   
                   
                          </tbody>
                      </table>
                      
                  </div>
                       <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                  </div>
          `
      OffenceListSummary.innerHTML += offence

    }
  }
  function filterOffences(offence, ref ){
   const result =  offences.filter(offence => offence.case === ref)
    return result
  }

  if(caseListContainer) {
    for(let x of cases) {
      if (x.type === 'remand') {
        let data = `  
            <li class="govuk-grid-column-one-third card-group__item ${x.type}">
                <div class="card card--clickable" data-test="manage-prisoner-whereabouts">
                    <h2 class="govuk-heading-m card__heading ">
                       Case: <span class="upper">${x.reference}</span><br>
                        <span class="govuk-hint">${x.court}</span>
                        
                    </h2>
                    
                    <p class=" govuk-!-margin-bottom-0 govuk-heading-s type">${x.type}</p>
                    <span class="govuk-hint">${x.date}</span>
                    <span class="govuk-hint">${x.outcome}</span>
                    <ul class="govuk-list govuk-!-margin-top-6">
                      
                        <li><a class="viewCase" data-case='${x.reference}' href="view-case.html">View case</a></li>
                        <li>
                           <a class="viewDocuments" data-case='${x.reference}' href="case-documents.html">View case documents</a>
                        </li>
                          <li><a class="viewCase" data-case='${x.reference}' href="check-your-answers.html">Update case</a></li>
                    </ul>
                </div>
            </li>`
        caseListContainer.innerHTML += data
      } else {
        let data = `  
            <li class="govuk-grid-column-one-third card-group__item ${x.type}">
                <div class="card card--clickable" data-test="manage-prisoner-whereabouts">
                    <h2 class="govuk-heading-m card__heading ">
                       Case: <span class="upper">${x.reference}</span><br>
                        <span class="govuk-hint">${x.court}</span>
                        
                    </h2>
                    
                    <p class=" govuk-!-margin-bottom-0 govuk-heading-s type">${x.type}</p>
                    <span class="govuk-hint">${x.date}</span>
                
                    <ul class="govuk-list govuk-!-margin-top-6">
                      
                        <li><a class="viewCase" data-case='${x.reference}' href="view-case.html">View case</a></li>
                        <li>
                           <a class="viewDocuments" data-case='${x.reference}' href="case-documents.html">View case documents</a>
                        </li>
                          <li><a class="viewCase" data-case='${x.reference}' href="check-your-answers.html">Update case</a></li>
                    </ul>
                </div>
            </li>`
        caseListContainer.innerHTML += data
      }
    }
  }

  if(fileUploadButton){
    let p = localStorage.getItem('activeCase')
    console.log(p)
    fileUploadButton.addEventListener('click', function(e){
      e.preventDefault()
      let documentDataSet = {
        case: p,
        type: getRadioValue(Array.from(documentType)),
        source:getRadioValue(Array.from(documentSource))
      }

      addNewDocument('documents', documentDataSet)

      location.href = 'confirmation-page-document-upload'
    })
  }

  function displayUploads(uploads, activeCase) {
    const result =  uploads.filter(upload => upload.case === activeCase)
    let noUploads = `<p class="govuk-body">No documents</p>`
    if(result.length < 1) {
      caseDocumentsContainer.innerHTML += noUploads;
    }else {
      for(let x of documents){
        console.log(x.case, activeCase)
        if(x.case === activeCase){
          let documentItem = `
        <div>
            <p><a href="#">${x.type}</a><br><span class="govuk-hint">${x.source}</span></p>
            <p>uploaded on DD MMM YYYY</p>
        </div>
      `
          caseDocumentsContainer.innerHTML += documentItem;
        }
      }
    }
  }
if(caseDocumentsContainer){
  const activeCase = localStorage.getItem('activeCase')
  const p = documents;
  console.log(p, activeCase)
  displayUploads(p, activeCase)

}
  if(viewCaseLink){
    console.log(cases)

    for(let x of viewCaseLink) {
      x.addEventListener('click', function(e){
        //e.preventDefault()
        let caseRef = x.getAttribute('data-case');
        const activeCase =  cases.filter(x => x.reference === caseRef)
        console.log(caseRef)
        console.log(activeCase)
        localStorage.setItem('activeCase', caseRef)
        //location.href = 'view-case.html'
      })
    }
  }
  // if(checkYourAnswersButton) {
  //   let p = getLastCase(cases)
  //   console.log("cases", localStorage.getItem("cases"))
  //   console.log(p.court)
  //   console.log("offences", localStorage.getItem("offences"))
  //   console.log(offences)
  //   for(let x of offences) {
  //     console.log(x)
  //
  //   }
  //
  // }


});