
document.addEventListener("DOMContentLoaded", () => {
  let emptyArray = [];
  //localStorage.setItem('cases', emptyArray)

  let cases = localStorage.getItem('cases');
  cases = cases ? JSON.parse(cases) : [];

  let offences = localStorage.getItem('offences');
  offences = offences ? JSON.parse(offences) : [];

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


  //let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);

  //lists
  const caseTypeRadios = document.getElementsByClassName('case-type')
  const offenceOutcomes = document.getElementsByClassName('outcome-sub-category')
  const addAnother = document.getElementsByClassName('add-another')


  //buttons
  const caseDetailsSubmitButton = document.getElementById('case-details-button')
  const custodialDetailsSubmitButton = document.getElementById('custodial-details-button')
  const remandDetailsSubmitButton = document.getElementById('remand-details-button')
  const addAnOffenceButton = document.getElementById('add-an-offence-button')
  const addSentenceButton = document.getElementById('add-sentence-button2')
  const checkYourAnswersButton = document.getElementById('check-your-answers-button')


  //helpers
  function radioRoute(radios) {
    for(let x of radios) {
      if(x.checked) {
        let route = x.getAttribute("data-route")
        location.href = `${route}.html`;
      }
    }
  }

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
    const optionValue = caseList.length && caseList.find(c => c.id === caseList.length);
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
  function addNewDataItem(localStorageItem, dataItem){
    offences.push(dataItem)
    localStorage.setItem(localStorageItem, JSON.stringify(offences));
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
        monthName = 'Invalid ';
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

      addNewDataItem('cases', courtCase,)
      radioRoute(caseTypeRadios)

    })
  }

 if(custodialDetailsSubmitButton){
   console.log("cases", localStorage.getItem("cases"))
   let cases = JSON.parse(localStorage.getItem("cases"))
   custodialDetailsSubmitButton.addEventListener('click', function(e){
      e.preventDefault()
      let p = getLastCase(cases)
      p.overallSentenceLength =  printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);
      localStorage.setItem('cases', JSON.stringify(cases))
      console.log('updated cases with osl', cases)
      location.href = 'add-an-offence.html'

   })
 }


 if(addAnOffenceButton){

   let cases = JSON.parse(localStorage.getItem("cases"))
   let count = offences.length
   addAnOffenceButton.addEventListener('click', function(e){
     e.preventDefault()
     let count = offences.length
     let p = getLastCase(cases)
     let outcome = getRadioValue(Array.from(offenceOutcomes))
     let offenceItem = {
       id: count+1,
       name:offence.value,
       startdate:createDate(offenceDateDay, offenceDateMonth, offenceDateYear),
       endDate:createDate(offenceEndDateDay, offenceEndDateMonth, offenceEndDateYear),
       outcome:outcome,
       case: p.reference
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


 if(checkYourAnswersButton) {
   let p = getLastCase(cases)
   console.log("cases", localStorage.getItem("cases"))
   console.log(p.court)
   console.log("offences", localStorage.getItem("offences"))
   console.log(offences)
for(let x of offences) {
  console.log(x)
  let offence = `<div>${x.name}</div>`
  OffenceListSummary.innerHTML += offence
}

   checkYourAnswersButton.addEventListener('click',function(e){
      e.preventDefault()
     radioRoute(addAnother)
   })
 }

  if(remandDetailsSubmitButton){
    
  }

});