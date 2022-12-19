
document.addEventListener("DOMContentLoaded", () => {
  let emptyArray = [];
  //localStorage.setItem('cases', emptyArray)

  let cases = localStorage.getItem('cases');
  cases = cases ? JSON.parse(cases) : [];
//let cases = [];
  //data inputs
  const courtName = document.getElementById('court-name');
  const courtDateDay = document.getElementById('court-date-day');
  const courtDateMonth = document.getElementById('court-date-month');
  const courtDateYear = document.getElementById('court-date-year');
  const courtCaseReference = document.getElementById('court-case-reference');
  const courtCaseType = document.getElementsByClassName('case-type');

  const sentenceLengthYears = document.getElementById("sentence-length-years")
  const sentenceLengthMonths = document.getElementById("sentence-length-months")
  const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
  const sentenceLengthDays = document.getElementById("sentence-length-days")

  //lists
  const caseTypeRadios = document.getElementsByClassName('case-type')


  //buttons
  const caseDetailsSubmitButton = document.getElementById('case-details-button')
  const custodialDetailsSubmitButton = document.getElementById('custodial-details-button')
  const addAnOffenceButton = document.getElementById('add-an-offence-button')


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
  function addNewCase(localStorageItem, dataItem){
    cases.push(dataItem)
    localStorage.setItem(localStorageItem, JSON.stringify(cases));
    console.log("updated cases", JSON.parse(localStorage.getItem("cases")))
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

      addNewCase('cases', courtCase,)
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
   console.log("cases", localStorage.getItem("cases"))

   addAnOffenceButton.addEventListener('click', function(e){
     e.preventDefault()
     let offences = []
     let offence = {
       name:'name',
       startdate:"sd",
       endDAte: 'ed',
       outcome:"outcome"
     }
   })
 }



});