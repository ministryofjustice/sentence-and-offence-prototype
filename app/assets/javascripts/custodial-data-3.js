console.log("g");

let arr = [];

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

function updateData(lsName, dataItem, dataObject){
  arr = JSON.stringify(dataItem)
  dataItem.push(dataObject);
  localStorage.setItem(lsName, JSON.stringify(dataItem))
  console.log(2, dataItem)
}

function addOffence(offence, offenceDate, offenceEndDate, outcome){
  let offenceItem = localStorage.getItem('offenceItem');
  offenceItem = offenceItem ? JSON.parse(offenceItem) : []

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

function addSentence(offence, convictionDate, sentenceType, sentenceDate, sentenceLength){
  let sentenceItem = localStorage.getItem('sentenceItem');
  sentenceItem = sentenceItem ? JSON.parse(sentenceItem) : []
  let count = sentenceItem.length;
  let oo = {
    id: count +1,
    offence: JSON.parse(offence),
    sentenceType: sentenceType,
    sentenceDate: sentenceDate,
    sentenceLength: sentenceLength
  }
  console.log(oo)
  updateData("sentenceItem", sentenceItem, oo)
  location.href = 'sentences.html';
}

function addCCSentence(offence, convictionDate, sentenceType, sentenceDate, sentenceLength, cc, caseNo, toOffence){
  let sentenceItem = localStorage.getItem('sentenceItem');
  sentenceItem = sentenceItem ? JSON.parse(sentenceItem) : []
  let count = sentenceItem.length;
  let oo = {
    id: count +1,
    offence: JSON.parse(offence),
    sentenceType: sentenceType,
    sentenceDate: sentenceDate,
    sentenceLength: sentenceLength,
    cc:cc,
    caseNo:caseNo,
    toOffence: toOffence
  }
  console.log(oo)
  updateData("sentenceItem", sentenceItem, oo)
  location.href = 'sentences.html';
}

// on click button route to page


const outcomeButton = document.getElementById("add-sentence-button");
if(outcomeButton) {
  outcomeButton.addEventListener("click", function(e){
   e.preventDefault();

  const offence = document.getElementById("offence-picker");
  const offenceDateDay = document.getElementById("offence-start-day");
  const offenceDateMonth = document.getElementById("offence-start-month");
  const offenceDateYear = document.getElementById("offence-start-year");
  const offenceEndDateDay = document.getElementById("offence-end-day");
  const offenceEndDateMonth = document.getElementById("offence-end-month");
  const offenceEndDateYear = document.getElementById("offence-end-year");
  const outcome = document.getElementById("outcome-picker");
  const outcomeItem = document.getElementsByClassName("outcome-picker-item")

  let offenceDate = createDate(offenceDateDay, offenceDateMonth, offenceDateYear)
  let offenceEndDate = createDate(offenceEndDateDay, offenceEndDateMonth, offenceEndDateYear)

  addOffence(offence.value, offenceDate, offenceEndDate, outcome.value);
  let offencels = localStorage.getItem('offence')
    //sort this out
    if(outcome.value === "Not guilty") {
      addSentence(offencels, "n", "n", "n", "n", "n", "n")
    }
  let url = setRoute(outcome.value)
  location.href = url;
})
}
function setRoute(selectedValue){
  if(selectedValue === "Guilty"){
    return "sentence-detail.html"
  } else if(selectedValue === "Guilty2"){
    return "sentence-detail-2.html"
  } else {
    return "sentences.html"
  }
}

const radios = document.getElementsByClassName("govuk-radios__input")
function radioRoute() {
  for(let x of radios) {
    if(x.checked) {
      let route = x.getAttribute("data-route")
      location.href = `${route}.html`;
    }
  }
}

const routeButton = document.getElementById("checkButton")
if(routeButton) {
  routeButton.addEventListener("click", function (e) {
    e.preventDefault()
    radioRoute()
  })
}


const sentenceDetailsButton = document.getElementById("add-sentence-detail-button");

if(sentenceDetailsButton){
  sentenceDetailsButton.addEventListener("click", function(e){
    e.preventDefault()
    const convictionDateDay = document.getElementById("conviction-day")
    const convictionDateMonth = document.getElementById("conviction-month")
    const convictionDateYear = document.getElementById("conviction-year")
    const sentenceType = document.getElementById("sentence-type")
    const sentenceDateDay = document.getElementById("sentence-date-day")
    const sentenceDateMonth = document.getElementById("sentence-date-month")
    const sentenceDateYear = document.getElementById("sentence-date-year")
    const sentenceLengthYears = document.getElementById("sentence-length-years")
    const sentenceLengthMonths = document.getElementById("sentence-length-months")
    const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
    const sentenceLengthDays = document.getElementById("sentence-length-days")

    let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);

    const offence = localStorage.getItem('offence');
    let convictionDate = createDate(convictionDateDay, convictionDateMonth, convictionDateYear)
    let sentenceDate = createDate(sentenceDateDay, sentenceDateMonth, sentenceDateYear)
  console.log(sentenceLengthDays.value)
    addSentence(offence, convictionDate, sentenceType, sentenceDate, sentenceLength)
    location.href = 'sentences.html';
  })
}
//move these higher

function getDropdownValue(option){
  //const optionValue = option.length && option.find(c => c.selected).text;
  const optionValue = option.length && option.find(c => c.selected).text;
  return optionValue
}

function getOffenceItem(list){
  console.log("hero", list)
  for (let x of list) {

  }

}
function getRadioValue(option){

    const optionValue = option.length && option.find(c => c.checked).value;
    return optionValue

}
const page = document.getElementsByClassName('cc')[0];

if (page) {
  const pageButton = document.getElementById('add-sentence-button2');
  const caseList = document.getElementById('cases');

  const convictionDateDay = document.getElementById("conviction-day")
  const convictionDateMonth = document.getElementById("conviction-month")
  const convictionDateYear = document.getElementById("conviction-year")
  const sentenceType = document.getElementById("sentence-type")
  const sentenceDateDay = document.getElementById("sentence-date-day")
  const sentenceDateMonth = document.getElementById("sentence-date-month")
  const sentenceDateYear = document.getElementById("sentence-date-year")
  const sentenceLengthYears = document.getElementById("sentence-length-years")
  const sentenceLengthMonths = document.getElementById("sentence-length-months")
  const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
  const sentenceLengthDays = document.getElementById("sentence-length-days")

  const ccInput = Array.from(document.getElementsByClassName('cc-input'));
  //const ccOffence = Array.from(document.getElementsByClassName('ccOffence'));
  const ccOffence = document.getElementsByClassName('ccOffence');
  const cases = Array.from(document.getElementsByClassName('case-option'));
  const offences = Array.from(document.getElementsByClassName('offence-option'));
  const offenceList = document.getElementById('offences');

  function getCheckedItem(list){
    for (let x of list) {
      if (x.checked){
        return x.value;
      }
    }
  }
function createToOffence(x, y) {
    if (x === "Consecutive") {
      //getRadioValue(y)
      console.log("45", y)
      return getCheckedItem(y)
    }
    else {
      //let z = getOffenceItem(y)
      return ""
    }
}

  getOffenceItem(ccOffence);

  console.log('ds',ccOffence)

  pageButton.addEventListener("click", function (e){
    e.preventDefault();
    let arry = Array.from(ccOffence);


    //const caseNumber = cases.length && cases.find(c => c.selected).value;
    //const toOffence = getDropdownValue(offenceList)
    //const toOffence = offenceList.value
    const caseNumber = getDropdownValue(cases)
    //const cc = getRadioValue(ccInput);
    const cc = getCheckedItem(ccInput);
    const toOffence = createToOffence(cc, arry)
    // const toOffence = ""
    // if (cc === "Concurrent") {
    //   const toOffence = getRadioValue(arry);
    // } else {
    //  return toOffence = ""
    // }
    console.log("44",toOffence)
    let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);

    const offence = localStorage.getItem('offence');
    let convictionDate = createDate(convictionDateDay, convictionDateMonth, convictionDateYear)
    let sentenceDate = createDate(sentenceDateDay, sentenceDateMonth, sentenceDateYear)

    if (toOffence === "another case") {
      addCCSentence(offence, convictionDate, sentenceType.value, sentenceDate, sentenceLength, cc, caseNumber, "toOffence");
      location.href = 'case-list.html';
    } else {
      addCCSentence(offence, convictionDate, sentenceType.value, sentenceDate, sentenceLength, cc, caseNumber, toOffence);
    }
  })
}

const thisOffenceContainer = document.getElementById("this-sentence-detail")
if (thisOffenceContainer) {
  const dataDump = localStorage.getItem("offence")
  const data = JSON.parse(dataDump)
  console.log(data)

  // for (let x of data) {
  //   if (x.offence.outcome === "Guilty") {
      let details = `<p>Enter the details related to the following offence:</p>
                    <strong>Offence: </strong>${data.offence}<br>
                    <strong>Date: </strong> ${data.offenceDate}`

      thisOffenceContainer.innerHTML = details

    }
//   }
// }
const sentenceListButton = document.getElementById("checkButton")
const sentenceList = document.getElementById("sentence-list");
if(sentenceList){
  const dataDump = localStorage.getItem("sentenceItem")
  //const dataDump = localStorage.getItem("sentenceItem")
  const data = JSON.parse(dataDump)

function printcc( sType, offence){
    if (sType === "concurrently") {
      //return (sType ? `To be served ` + sType + " to " + offence : "")
      return "To be served concurrently"
    } else {
      return (sType ? `To be served  ` + sType + " to " + offence : "")
    }
}

  for(let x of data){
    if(x.offence.outcome === "Guilty" || x.offence.outcome === "Guilty2") {
      let listItem = `
                    <div class="sentence-block">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Offence ${x.id}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.offence.offence}
                      </h4>
                      <p class="govuk-body-s">Committed on ${x.offence.offenceDate}</p>
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
                                  <th scope="row" class="govuk-table__header sentence-table-header">Sentence length</th>
                                  <td class="govuk-table__cell">${x.sentenceLength}
                                  </td>
                              </tr>
                              <tr class="govuk-table__row govuk-body-s firstcc">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Concurrent or consecutive</th>
                                  <td class="govuk-table__cell">${printcc(x.cc, x.toOffence)}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      
                  </div>
                      <ul class="">
                          <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                          <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                      </ul>
                  </div>
        `
      sentenceList.innerHTML += listItem
    } else if (x.offence.outcome === "Not guilty") {
      let listItem = `
                   <div class="sentence-block ng">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Offence ${x.id}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.offence.offence}
                      </h4>
                      <table class="govuk-table govuk-!-margin-right-4 govuk-!-margin-bottom-6 govuk-!-margin-bottom-0">
                          <tbody class="govuk-table__body">
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Verdict</th>
                                  <td class="govuk-table__cell">${x.offence.outcome}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                      <ul class="">
                        <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                        <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                      </ul>
                    </div>
        `
      sentenceList.innerHTML += listItem
    }
  }
  let firstItem = document.getElementsByClassName('firstcc')[0].style.display = "none";
}

if(sentenceListButton){
  sentenceListButton.addEventListener("click", function(e){
    e.preventDefault()







  })
}

const courtDetailsButton = document.getElementById("court-details-button");
if(courtDetailsButton) {
  courtDetailsButton.addEventListener("click", function (e) {
    const courtName = document.getElementById("court-name");
    const courtDay = document.getElementById("court-date-day");
    const courtMonth = document.getElementById("court-date-month");
    const courtYear = document.getElementById("court-date-year");
    const caseReference = document.getElementById("court-case-reference");

    const sentenceLengthYears = document.getElementById("sentence-length-years")
    const sentenceLengthMonths = document.getElementById("sentence-length-months")
    const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
    const sentenceLengthDays = document.getElementById("sentence-length-days")
   //const outcome = document.getElementById("outcome");
    e.preventDefault();
    let date = createDate(courtDay, courtMonth, courtYear)
    let overallSentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);
    //console.log(courtName.value, date, caseReference.value, hearing.value, outcome.value)
    addCourtDetails(courtName.value, date, caseReference.value,  overallSentenceLength)

    location.href = 'add-a-sentence.html';
  })

  function addCourtDetails (court, date, ref,  overallSentenceLength) {
    let courtDetails = localStorage.getItem('courtDetails');
    console.log(courtDetails)
    courtDetails = courtDetails ? JSON.parse(courtDetails) : []
    //let count = courtDetails.length;

    let courtDetailsObject = {
      court: court,
      date: date,
      ref: ref,

      overallSentenceLength:overallSentenceLength
      //outcome: outcome
    }
    //arr = JSON.stringify(courtDetails)
    //courtDetails.push(courtDetailsObject);

    //localStorage.setItem('courtDetails', JSON.stringify(courtDetails))
    localStorage.setItem('courtDetails', JSON.stringify(courtDetailsObject))
    console.log(2, courtDetails, localStorage.getItem('courtDetails'))
  }
}

//check your answers page

const sentenceSummaryContainer = document.getElementById("SentenceListSummary")
if(sentenceSummaryContainer){
  const sentenceData = localStorage.getItem('sentenceItem');
  const sentenceDataList = JSON.parse(sentenceData);
  console.log(sentenceDataList)
  for (let x of sentenceDataList) {
    if(x.offence.outcome === "Guilty" || x.offence.outcome ===  "Guilty2")  {

      //let line = `<p><strong>to be served: </strong>${x.cc} to </br><span>${x.toOffence}</span></p>`
      let newSentence = `
               <div class="sentence-block">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Offence ${x.id}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.offence.offence}
                      </h4>
                      <p class="govuk-body-s">Committed on ${x.offence.offenceDate}</p>
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
                                  <th scope="row" class="govuk-table__header sentence-table-header">Sentence length</th>
                                  <td class="govuk-table__cell">${x.sentenceLength}
                                  </td>
                              </tr>
                              <tr class="govuk-table__row govuk-body-s firstcc">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Concurrent or consecutive</th>
                                  <td class="govuk-table__cell">to be served: ${x.cc} to ${x.toOffence}
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
      sentenceSummaryContainer.innerHTML += newSentence;
    } else if (x.offence.outcome === "Not guilty"){
      let newSentence = `
           <div class="sentence-block ng">
                    <div class="govuk-grid-column-full govuk-!-margin-top-4">
                      <h3 class="govuk-body-s govuk-!-margin-bottom-0">Offence ${x.id}</h3>
                      <h4 class="govuk-heading-s govuk-!-margin-bottom-1">
                          ${x.offence.offence}
                      </h4>
                      <table class="govuk-table govuk-!-margin-right-4 govuk-!-margin-bottom-6 govuk-!-margin-bottom-0">
                          <tbody class="govuk-table__body">
                              <tr class="govuk-table__row govuk-body-s">
                                  <th scope="row" class="govuk-table__header sentence-table-header">Verdict</th>
                                  <td class="govuk-table__cell">${x.offence.outcome}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                      <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                    </div>
      `
      sentenceSummaryContainer.innerHTML += newSentence;
    }
  }
let firstItem = document.getElementsByClassName('firstcc')[0].style.display = "none";

}
const caseRef = document.getElementById("caseRef");

if (caseRef){
  const courtData = JSON.parse(localStorage.getItem('courtDetails'));

  caseRef.innerHTML = courtData.ref;
}
const courtDetails = document.getElementById("court-details");
if (courtDetails) {
  const courtData = JSON.parse(localStorage.getItem('courtDetails'));
  let court = `<div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                        Court
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${courtData.court}
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
                          ${courtData.date}
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
                          ${courtData.ref}
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
                          ${courtData.overallSentenceLength}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="court-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                 `
  courtDetails.innerHTML += court;

}


// create object

//list items on screen

// tag links with ID

//store ID in local storage

//use local storage to filter array

//add new data to array

//save data back to object

//



const sentenceSummaryContainerTRS = document.getElementById("SentenceListSummaryTRS")
if(sentenceSummaryContainerTRS){
  const sentenceData = localStorage.getItem('sentenceItem');
  const sentenceDataList = JSON.parse(sentenceData);
  console.log("F",sentenceDataList)

  for (let x of sentenceDataList) {
    if(x.offence.outcome === "Guilty" || "Guilty2") {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                           <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                            <p><strong>Sentence length: </strong>
                            <span>${x.sentenceLength}</span></p>
                        </dt>
                          <dd class="govuk-summary-list__actions">
                                <a id="${x.id}" class="govuk-link add-sentence" href="sentence-details.html">
                                    Add sentence details<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                            </dd>
                    </div>`
      sentenceSummaryContainerTRS.innerHTML += newSentence;
    } else {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                           <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                        </dt>
                          <dd class="govuk-summary-list__actions">
                                <a  id="${x.id}" class=" add-sentence govuk-link" href="sentence-detail-trs.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                            </dd>
                        
                    </div>`
      sentenceSummaryContainerTRS.innerHTML += newSentence;
    }
  }
}

let sentenceLink = document.getElementsByClassName("add-sentence");
if (sentenceLink) {
  for(let x of sentenceLink) {
    let id = x.getAttribute("id")
    x.addEventListener("click", function (e) {
      e.preventDefault()
      localStorage.setItem("targetOffence", id)
      console.log(localStorage.getItem('targetOffence'))
      location.href = "sentence-detail-trs.html"
    })
  }
}

const sentenceDetailPage = document.getElementById("this-sentence-detail-trs")

if(sentenceDetailPage){
  // const sentenceData = localStorage.getItem('sentenceItem');
  // const sentenceDataList = JSON.parse(sentenceData);
  // const itemOfInterest = parseFloat(localStorage.getItem('targetOffence'));
  // console.log(sentenceDataList[itemOfInterest-1])
  // console.log(sentenceDataList[itemOfInterest-1].sentence)
  // sentenceDataList[itemOfInterest-1].sentence = "25"
  // console.log(sentenceDataList[itemOfInterest-1].sentence)
  // console.log(sentenceDataList[itemOfInterest-1])
  // console.log(sentenceDataList)



}

const sentenceDetailsButtonTRS = document.getElementById("add-sentence-detail-button-trs");
const sentenceDetailsInset = document.getElementById("this-sentence-detail-trs");

if(sentenceDetailsButtonTRS){
  const sentenceData = localStorage.getItem('sentenceItem');
  const sentenceDataList = JSON.parse(sentenceData);
  const itemOfInterest = parseFloat(localStorage.getItem('targetOffence'));
console.log(sentenceDataList[itemOfInterest-1]);
  let details = `<p>The details relate to the following offence</p>
                    <strong>Offence: </strong>${sentenceDataList[itemOfInterest-1].offence.offence}<br>
                    <strong>Date: </strong>${sentenceDataList[itemOfInterest-1].sentenceDate}`

  sentenceDetailsInset.innerHTML = details
  sentenceDetailsButtonTRS.addEventListener("click", function(e){
    e.preventDefault()


    const convictionDateDay = document.getElementById("conviction-day")
    const convictionDateMonth = document.getElementById("conviction-month")
    const convictionDateYear = document.getElementById("conviction-year")
    const sentenceType = document.getElementById("sentence-type")
    const sentenceDateDay = document.getElementById("sentence-date-day")
    const sentenceDateMonth = document.getElementById("sentence-date-month")
    const sentenceDateYear = document.getElementById("sentence-date-year")
    const sentenceLengthYears = document.getElementById("sentence-length-years")
    const sentenceLengthMonths = document.getElementById("sentence-length-months")
    const sentenceLengthWeeks = document.getElementById("sentence-length-weeks")
    const sentenceLengthDays = document.getElementById("sentence-length-days")

    let sentenceLength = printSentence(sentenceLengthDays, sentenceLengthWeeks, sentenceLengthMonths, sentenceLengthYears);
    // let convictionDate = createDate(convictionDateDay, convictionDateMonth, convictionDateYear)
    // let sentenceDate = createDate(sentenceDateDay, sentenceDateMonth, sentenceDateYear)
    console.log("a",sentenceDataList[itemOfInterest-1])
    sentenceDataList[itemOfInterest-1].sentenceLength = sentenceLength
   // sentenceDataList[itemOfInterest-1].sentenceType = sentenceType.value
   // sentenceDataList[itemOfInterest-1].sentenceDate = sentenceDate
   // const offence = localStorage.getItem('offence');
    console.log("b",sentenceDataList[itemOfInterest-1])
    console.log("c",sentenceDataList)
    console.log("d",sentenceLengthYears.value)

    //addSentence(offence, convictionDate, sentenceType, sentenceDate, sentenceLength)
    localStorage.setItem('sentenceItem',  JSON.stringify(sentenceDataList))
    console.log(JSON.parse(localStorage.getItem('sentenceItem')))
    location.href = 'sentences.html';
  })
}

const addOffenceButton = document.getElementById("add-offence-button2");

if (addOffenceButton) {
  console.log("offence button")
  addOffenceButton.addEventListener("click", function(e) {
      e.preventDefault()
    const offenceList = JSON.parse(window.localStorage.getItem('sentenceItem'));

      console.log()

      const ccOffence = document.getElementsByClassName('cc-input')
      let arr = Array.from(ccOffence)
      let p = getRadioValue(arr);
    console.log(offenceList.length)
    let rr = offenceList.find(x=> x.id === offenceList.length);
      rr.toOffence = p
console.log(rr)

      console.log(p, offenceList)
    const list =JSON.stringify(offenceList)
    window.localStorage.setItem('sentenceItem', list)
      console.log(window.localStorage.getItem('sentenceItem'))
    location.href = 'sentences.html'

    }
  )
}



const sentenceTypes =
  [
    {
      "SentenceType": "CJA03 Standard Determinate Sentence"
    },
    {
      "SentenceType": "ORA Sentencing Code Standard Determinate Sentence"
    },
    {
      "SentenceType": "Sentencing Code Standard Determinate Sentence"
    },
    {
      "SentenceType": "ORA CJA03 Standard Determinate Sentence"
    },
    {
      "SentenceType": "Licence Recall"
    },
    {
      "SentenceType": "EDS LASPO Discretionary Release"
    },
    {
      "SentenceType": "ORA Licence Recall"
    },
    {
      "SentenceType": "ORA Licence Recall"
    },
    {
      "SentenceType": "Section 236A SOPC CJA03"
    },
    {
      "SentenceType": "Licence Recall"
    },
    {
      "SentenceType": "Indeterminate Sentence for the Public Protection"
    },
    {
      "SentenceType": "Imprisonment in Default of Fine"
    },
    {
      "SentenceType": "EDS Sec 279 Sentencing Code (21+)"
    },
    {
      "SentenceType": "Imprisonment in Default of Fine"
    },
    {
      "SentenceType": "Life Imprisonment or Detention S.53(1) CYPA 1933"
    },
    {
      "SentenceType": "ORA Young Offender Institution"
    },
    {
      "SentenceType": "Young Offender Institution"
    },
    {
      "SentenceType": "Life or Indeterminate Sentence for Public Protection"
    },
    {
      "SentenceType": "Licence recall from IPP Sentence"
    },
    {
      "SentenceType": "Adult Mandatory Life"
    },
    {
      "SentenceType": "Young Offender Institution"
    },
    {
      "SentenceType": "SOPC Sec 278 Sentencing Code (21+)"
    },
    {
      "SentenceType": "Adult Discretionary Life"
    },
    {
      "SentenceType": "Automatic LIfe"
    },
    {
      "SentenceType": "Adult Imprison above 4 years (not Life)"
    },
    {
      "SentenceType": "ORA Young Offender Institution"
    },
    {
      "SentenceType": "LR - EDS LASPO Discretionary Release"
    },
    {
      "SentenceType": "Adult Imprison above 12 mths below 4 yrs"
    },
    {
      "SentenceType": "Licence recall from Extended Sentence for Public Protection"
    },
    {
      "SentenceType": "Legacy (pre 1991 Act)"
    },
    {
      "SentenceType": "ORA 14 Day Fixed Term Recall"
    },
    {
      "SentenceType": "Recall to Custody Indeterminate Sentence"
    },
    {
      "SentenceType": "Adult Mandatory Life"
    },
    {
      "SentenceType": "Recall to Custody Indeterminate Sentence"
    },
    {
      "SentenceType": "Recall from YOI"
    },
    {
      "SentenceType": "ORA Detention and Training Order"
    },
    {
      "SentenceType": "ORA Breach Top Up Supervision"
    },
    {
      "SentenceType": "Automatic Life"
    },
    {
      "SentenceType": "ORA 28 Day Fixed Term Recall"
    },
    {
      "SentenceType": "EDS Sec 266 Sentencing Code (18 - 20)"
    },
    {
      "SentenceType": "Detention During Her Majesty's Pleasure"
    },
    {
      "SentenceType": "Detention For Life"
    },
    {
      "SentenceType": "Imprisoned in Default of a fine"
    },
    {
      "SentenceType": "Fixed Term Recall Pre ORA Sentence"
    },
    {
      "SentenceType": "Extended Sent Public Protection CJA 03"
    },
    {
      "SentenceType": "Adult Imprisonment less than 12 months"
    },
    {
      "SentenceType": "ORA Recalled from Curfew Conditions"
    },
    {
      "SentenceType": "Recall from Automatic Life"
    },
    {
      "SentenceType": "Licence Recall"
    },
    {
      "SentenceType": "Detention and Training Order"
    },
    {
      "SentenceType": "Serious Offence -18 CJA03 POCCA 2000"
    },
    {
      "SentenceType": "Recall from Discretionary Life"
    },
    {
      "SentenceType": "Serious Offence Sec 250 Sentencing Code (U18)"
    },
    {
      "SentenceType": "Automatic Life Sec 224A 03"
    },
    {
      "SentenceType": "LR - EDS LASPO Automatic Release"
    },
    {
      "SentenceType": "ORA 28 Day Fixed Term Recall"
    },
    {
      "SentenceType": "Adult Discretionary Life"
    },
    {
      "SentenceType": "Recall to Custody Mandatory Life"
    },
    {
      "SentenceType": "Recall from YOI"
    },
    {
      "SentenceType": "Custody Life (18-21 Years Old)"
    },
    {
      "SentenceType": "Adult Discretionary Life"
    },
    {
      "SentenceType": "Custody For Life - Under 21 CJA03"
    },
    {
      "SentenceType": "Civil Imprisonment"
    },
    {
      "SentenceType": "ORA Serious Offence -18 CJA03 POCCA 2000"
    },
    {
      "SentenceType": "ORA Serious Offence Sec 250 Sentencing Code (U18)"
    },
    {
      "SentenceType": "Adult Mandatory Life"
    },
    {
      "SentenceType": "Sent Extended Sec 86 of PCC(S) Act 2000"
    },
    {
      "SentenceType": "Recall to Custody Indeterminate Sentence"
    },
    {
      "SentenceType": "Breach of Curfew"
    },
    {
      "SentenceType": "LR - EDS Sec 279 Sentencing Code (21+)"
    },
    {
      "SentenceType": "EDS Sec 254 Sentencing Code (U18)"
    },
    {
      "SentenceType": "Fixed Term Recall Pre ORA Sentence"
    },
    {
      "SentenceType": "Detention During Her Majesty' s   Pleasure"
    },
    {
      "SentenceType": "EDS LASPO Automatic Release"
    },
    {
      "SentenceType": "ORA HDC Recall (not curfew violation)"
    },
    {
      "SentenceType": "Inability to Monitor"
    },
    {
      "SentenceType": "ORA Detention and Training Order"
    },
    {
      "SentenceType": "Recall Serious Off - 18 CJA03 POCCA 2000"
    },
    {
      "SentenceType": "Detention For Life"
    },
    {
      "SentenceType": "Recall from Automatic Life"
    },
    {
      "SentenceType": "Automatic Life Sec 273 Sentencing Code (18 - 20)"
    },
    {
      "SentenceType": "Young Offender Institution"
    },
    {
      "SentenceType": "Detention For Public Protection"
    },
    {
      "SentenceType": "Breach of Curfew"
    },
    {
      "SentenceType": "ORA Fixed Term Recall while on HDC"
    },
    {
      "SentenceType": "Licence recall from Extended Sentence"
    },
    {
      "SentenceType": "Detention and Training Order"
    },
    {
      "SentenceType": "LR - Section 236A SOPC CJA03"
    },
    {
      "SentenceType": "Civil Imprisonment"
    },
    {
      "SentenceType": "Custody For Life Sec 272 Sentencing Code (18 - 20)"
    },
    {
      "SentenceType": "Detention During Her Majesty's Pleasure"
    },
    {
      "SentenceType": "Custody For Life Sec 275 Sentencing Code (Murder) (U21)"
    },
    {
      "SentenceType": "SOPC Sec 265 Sentencing Code (18 - 20)"
    },
    {
      "SentenceType": "Automatic Life"
    },
    {
      "SentenceType": "Recall from Discretionary Life"
    },
    {
      "SentenceType": "ORA Recalled from Curfew Conditions"
    },
    {
      "SentenceType": "Automatic Life Sec 283 Sentencing Code (21+)"
    },
    {
      "SentenceType": "Recall to Custody Mandatory Life"
    },
    {
      "SentenceType": "Extended Sentence for the Public Protection"
    },
    {
      "SentenceType": "Migrated Sentence Data"
    },
    {
      "SentenceType": "Special sentence of detention for terrorist offenders of particular concern Sec 252A"
    },
    {
      "SentenceType": "Recall Serious Offence Sec 250 Sentencing Code (U18)"
    },
    {
      "SentenceType": "Detention For Life"
    },
    {
      "SentenceType": "14 Day Fixed Term Recall from HDC"
    },
    {
      "SentenceType": "Inability to Monitor"
    },
    {
      "SentenceType": "Licence recall from DPP Sentence"
    },
    {
      "SentenceType": "ORA HDC Recall (not curfew violation)"
    },
    {
      "SentenceType": "Youth Rehabilitation Order"
    },
    {
      "SentenceType": "Recall from Automatic Life Sec 224A 03"
    },
    {
      "SentenceType": "LR - EDS Sec 266 Sentencing Code (18 - 20)"
    },
    {
      "SentenceType": "Licence recall from DPP Sentence"
    },
    {
      "SentenceType": "Fixed Term Recall while on HDC"
    },
    {
      "SentenceType": "ORA Breach Top Up Supervision"
    },
    {
      "SentenceType": "Migrated Sentence Data"
    },
    {
      "SentenceType": "ORA 14 Day Fixed Term Recall"
    },
    {
      "SentenceType": "LR - SOPC Sec 278 Sentencing Code (21+)"
    },
    {
      "SentenceType": "Custody Life (18-21 Years Old)"
    },
    {
      "SentenceType": "Detention and Training Order"
    },
    {
      "SentenceType": "Custody For Life - Under 21"
    },
    {
      "SentenceType": "Detention For Public Protection"
    },
    {
      "SentenceType": "Serious Offence -18 POCCA 2000"
    },
    {
      "SentenceType": "IMPRISONED FOR LESS THAN 12 MONTHS"
    },
    {
      "SentenceType": "ORA FTR Schedule 15 Offender"
    },
    {
      "SentenceType": "Violent Offender Order"
    },
    {
      "SentenceType": "CIVIL IMPRISONMENT OVER 12 MONTHS SENTENCE"
    },
    {
      "SentenceType": "Life Imprisonment"
    },
    {
      "SentenceType": "Recall from Automatic Life Sec 283 Sentencing Code (21+)"
    }
  ]
let courts = [
  {
    "Court": "Birmingham Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Manchester MC",
    "FIELD2": ""
  },
  {
    "Court": "Westminster Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Leeds Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Sheffield Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Snaresbrook Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Liverpool Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Immigration",
    "FIELD2": ""
  },
  {
    "Court": "Leeds MC",
    "FIELD2": ""
  },
  {
    "Court": "Preston Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Nottingham Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Isleworth Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Cardiff Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "City of Westminster Mag Court",
    "FIELD2": ""
  },
  {
    "Court": "Wood Green Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham (Corporation St) MC",
    "FIELD2": ""
  },
  {
    "Court": "Harrow Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Thames MC",
    "FIELD2": ""
  },
  {
    "Court": "Manchester Crown Court (Crown Square)",
    "FIELD2": ""
  },
  {
    "Court": "Inner London Sessions House Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Liverpool Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Bradford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Maidstone Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Manchester Crown Court (Minshull Street)",
    "FIELD2": ""
  },
  {
    "Court": "Wolverhampton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Nottingham (Carrington St) MC",
    "FIELD2": ""
  },
  {
    "Court": "Cardiff MC",
    "FIELD2": ""
  },
  {
    "Court": "Croydon MC",
    "FIELD2": ""
  },
  {
    "Court": "Woolwich Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Teesside Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Bristol Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Kingston upon Thames Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Leicester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Derby Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Chelmsford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Middlesbrough MC",
    "FIELD2": ""
  },
  {
    "Court": "Luton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Reading Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Swansea Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Derby (St Mary's Gate) MC",
    "FIELD2": ""
  },
  {
    "Court": "Uxbridge MC",
    "FIELD2": ""
  },
  {
    "Court": "Ipswich Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Basildon Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Willesden MC",
    "FIELD2": ""
  },
  {
    "Court": "Central Criminal Court",
    "FIELD2": ""
  },
  {
    "Court": "Croydon Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Sheffield MC",
    "FIELD2": ""
  },
  {
    "Court": "Leicester MC",
    "FIELD2": ""
  },
  {
    "Court": "St. Albans Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Bromley (London Road) MC",
    "FIELD2": ""
  },
  {
    "Court": "Bristol MC",
    "FIELD2": ""
  },
  {
    "Court": "Lewes Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Leamington Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Bradford MC",
    "FIELD2": ""
  },
  {
    "Court": "Northampton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Hull Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Norwich Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Canterbury Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Chester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Highbury Corner Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle Upon Tyne Crown Court Moothall",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle upon Tyne Crown Court Quayside",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Hull Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Cambridge Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Southwark Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle-Under-Lyme Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Wolverhampton MC",
    "FIELD2": ""
  },
  {
    "Court": "Wimbledon MC",
    "FIELD2": ""
  },
  {
    "Court": "Northampton MC",
    "FIELD2": ""
  },
  {
    "Court": "Swansea (Grove Place) MC",
    "FIELD2": ""
  },
  {
    "Court": "Guildford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Preston MC",
    "FIELD2": ""
  },
  {
    "Court": "Coventry MC",
    "FIELD2": ""
  },
  {
    "Court": "Brighton Magistrates Court (Edward St)",
    "FIELD2": ""
  },
  {
    "Court": "Aylesbury Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Southampton (WH) Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Oxford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Reading MC",
    "FIELD2": ""
  },
  {
    "Court": "Barkingside Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Norwich MC",
    "FIELD2": ""
  },
  {
    "Court": "Kidderminster (Comberton Place) MC",
    "FIELD2": ""
  },
  {
    "Court": "Chelmsford MC",
    "FIELD2": ""
  },
  {
    "Court": "Great Grimsby Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Bolton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Worcester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Lincoln Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Medway Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Highbury Corner MC",
    "FIELD2": ""
  },
  {
    "Court": "Doncaster MC",
    "FIELD2": ""
  },
  {
    "Court": "Mold Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Merthyr Tydfil MC",
    "FIELD2": ""
  },
  {
    "Court": "Durham Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "York Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Oxford MC",
    "FIELD2": ""
  },
  {
    "Court": "Grimsby MC",
    "FIELD2": ""
  },
  {
    "Court": "Ipswich MC",
    "FIELD2": ""
  },
  {
    "Court": "Warrington Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Stafford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Colchester Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Stoke-on-Trent Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Exeter Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Southampton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Newport (South Wales) Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Carlisle Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Lincoln MC",
    "FIELD2": ""
  },
  {
    "Court": "Folkestone MC",
    "FIELD2": ""
  },
  {
    "Court": "Bournemouth Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Llandudno MC",
    "FIELD2": ""
  },
  {
    "Court": "Portsmouth MC",
    "FIELD2": ""
  },
  {
    "Court": "South Shields (Millbank) MC",
    "FIELD2": ""
  },
  {
    "Court": "Merthyr Tydfil Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Blackburn MC",
    "FIELD2": ""
  },
  {
    "Court": "Chatham MC",
    "FIELD2": ""
  },
  {
    "Court": "York MC",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Hull Combined Court Centre",
    "FIELD2": ""
  },
  {
    "Court": "Poole MC",
    "FIELD2": ""
  },
  {
    "Court": "Luton MC",
    "FIELD2": ""
  },
  {
    "Court": "Peterborough MC",
    "FIELD2": ""
  },
  {
    "Court": "North Shields Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Portsmouth Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Gloucester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Blackpool MC",
    "FIELD2": ""
  },
  {
    "Court": "Newton Aycliffe MC",
    "FIELD2": ""
  },
  {
    "Court": "Peterborough Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Guildford MC",
    "FIELD2": ""
  },
  {
    "Court": "Burnley Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Chester MC",
    "FIELD2": ""
  },
  {
    "Court": "Cambridge MC",
    "FIELD2": ""
  },
  {
    "Court": "Southend on Sea MC",
    "FIELD2": ""
  },
  {
    "Court": "Plymouth Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Swindon MC",
    "FIELD2": ""
  },
  {
    "Court": "Crewe MC",
    "FIELD2": ""
  },
  {
    "Court": "Cheltenham MC",
    "FIELD2": ""
  },
  {
    "Court": "Newport (South Wales) Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Winchester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Swindon Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Plymouth MC",
    "FIELD2": ""
  },
  {
    "Court": "Carlisle and District Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Wigan MC",
    "FIELD2": ""
  },
  {
    "Court": "Taunton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Shrewsbury Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Basingstoke MC",
    "FIELD2": ""
  },
  {
    "Court": "Exeter MC",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle Upon Tyne Mag Court (Quayside)",
    "FIELD2": ""
  },
  {
    "Court": "Basildon MC",
    "FIELD2": ""
  },
  {
    "Court": "Chesterfield (Tapton Lane) MC",
    "FIELD2": ""
  },
  {
    "Court": "Mansfield (Rosemary St) MC",
    "FIELD2": ""
  },
  {
    "Court": "Court Of Appeal Criminal Division",
    "FIELD2": ""
  },
  {
    "Court": "Truro Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Mold MC",
    "FIELD2": ""
  },
  {
    "Court": "Tameside MC",
    "FIELD2": ""
  },
  {
    "Court": "St Albans MC",
    "FIELD2": ""
  },
  {
    "Court": "Taunton MC",
    "FIELD2": ""
  },
  {
    "Court": "Milton Keynes MC",
    "FIELD2": ""
  },
  {
    "Court": "C and SW Staffs MC - Cannock",
    "FIELD2": ""
  },
  {
    "Court": "Runcorn MC",
    "FIELD2": ""
  },
  {
    "Court": "Staines MC",
    "FIELD2": ""
  },
  {
    "Court": "Newport (South Wales) Mag Court",
    "FIELD2": ""
  },
  {
    "Court": "Huntingdon MC",
    "FIELD2": ""
  },
  {
    "Court": "Sefton Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Birkenhead MC",
    "FIELD2": ""
  },
  {
    "Court": "Dudley MC",
    "FIELD2": ""
  },
  {
    "Court": "Stratford MC",
    "FIELD2": ""
  },
  {
    "Court": "Llanelli MC",
    "FIELD2": ""
  },
  {
    "Court": "Bedlington MC",
    "FIELD2": ""
  },
  {
    "Court": "Camberwell Green MC",
    "FIELD2": ""
  },
  {
    "Court": "Ealing MC",
    "FIELD2": ""
  },
  {
    "Court": "Hatfield Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "High Wycombe Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Caernarfon Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Preston (Sessions House) Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Hatfield Remand Court",
    "FIELD2": ""
  },
  {
    "Court": "Peterlee MC",
    "FIELD2": ""
  },
  {
    "Court": "Walsall (Stafford Street) MC",
    "FIELD2": ""
  },
  {
    "Court": "Crawley MC",
    "FIELD2": ""
  },
  {
    "Court": "Sunderland MC",
    "FIELD2": ""
  },
  {
    "Court": "Barnsley MC",
    "FIELD2": ""
  },
  {
    "Court": "Maidstone MC",
    "FIELD2": ""
  },
  {
    "Court": "Port Talbot Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Newport (I.O.W.) Mag Court",
    "FIELD2": ""
  },
  {
    "Court": "Bexley MC",
    "FIELD2": ""
  },
  {
    "Court": "Slough Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Bootle MC",
    "FIELD2": ""
  },
  {
    "Court": "Stevenage MC",
    "FIELD2": ""
  },
  {
    "Court": "Wrexham MC",
    "FIELD2": ""
  },
  {
    "Court": "Truro MC",
    "FIELD2": ""
  },
  {
    "Court": "Margate MC",
    "FIELD2": ""
  },
  {
    "Court": "Stockport Combined Court – Mag Court",
    "FIELD2": ""
  },
  {
    "Court": "Blackfriars Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "North Somerset Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Telford MC",
    "FIELD2": ""
  },
  {
    "Court": "Worcester (Castle St) MC",
    "FIELD2": ""
  },
  {
    "Court": "Salisbury Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Huddersfield MC",
    "FIELD2": ""
  },
  {
    "Court": "Newport (I.O.W.) Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Caernarfon Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle-Upon-Tyne MC",
    "FIELD2": ""
  },
  {
    "Court": "Reedley MC",
    "FIELD2": ""
  },
  {
    "Court": "BARROW IN FURNESS Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "South Warwickshire MC",
    "FIELD2": ""
  },
  {
    "Court": "Scarborough Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Bodmin MC",
    "FIELD2": ""
  },
  {
    "Court": "Hastings MC",
    "FIELD2": ""
  },
  {
    "Court": "Wycombe MC",
    "FIELD2": ""
  },
  {
    "Court": "Haverfordwest MC",
    "FIELD2": ""
  },
  {
    "Court": "Beverley MC",
    "FIELD2": ""
  },
  {
    "Court": "Weymouth MC",
    "FIELD2": ""
  },
  {
    "Court": "Furness and District Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "N Staffs Youth Court - Newcastle",
    "FIELD2": ""
  },
  {
    "Court": "Warrington Combined Court",
    "FIELD2": ""
  },
  {
    "Court": "Huntingdon Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Workington (West Cumbria) Magistrates Ct",
    "FIELD2": ""
  },
  {
    "Court": "Loughborough Courthouse",
    "FIELD2": ""
  },
  {
    "Court": "Bolton MC",
    "FIELD2": ""
  },
  {
    "Court": "Southend Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Salisbury MC",
    "FIELD2": ""
  },
  {
    "Court": "City of London (Queen Victoria St) MC",
    "FIELD2": ""
  },
  {
    "Court": "Weston Super Mare MC",
    "FIELD2": ""
  },
  {
    "Court": "Snaresbrook Crown Court (Annex)",
    "FIELD2": ""
  },
  {
    "Court": "Wellingborough MC",
    "FIELD2": ""
  },
  {
    "Court": "Coventry Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Harrogate MC",
    "FIELD2": ""
  },
  {
    "Court": "Hendon MC",
    "FIELD2": ""
  },
  {
    "Court": "Sevenoaks MC",
    "FIELD2": ""
  },
  {
    "Court": "Bath MC",
    "FIELD2": ""
  },
  {
    "Court": "Burnley and Pendle Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Hove Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Royal Courts Of Justice",
    "FIELD2": ""
  },
  {
    "Court": "Romford MC",
    "FIELD2": ""
  },
  {
    "Court": "Amersham Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Aberystwyth MC",
    "FIELD2": ""
  },
  {
    "Court": "Great Yarmouth MC",
    "FIELD2": ""
  },
  {
    "Court": "Lancaster MC",
    "FIELD2": ""
  },
  {
    "Court": "King's Lynn Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Gateshead MC",
    "FIELD2": ""
  },
  {
    "Court": "Manchester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Scarborough (Northway) MC",
    "FIELD2": ""
  },
  {
    "Court": "Yeovil MC",
    "FIELD2": ""
  },
  {
    "Court": "Worthing MC",
    "FIELD2": ""
  },
  {
    "Court": "Cwmbran MC",
    "FIELD2": ""
  },
  {
    "Court": "Redbridge MC",
    "FIELD2": ""
  },
  {
    "Court": "Court Not Known",
    "FIELD2": ""
  },
  {
    "Court": "Caernarfon (County Court) MC",
    "FIELD2": ""
  },
  {
    "Court": "West Allerdale and Keswick Mag. Court",
    "FIELD2": ""
  },
  {
    "Court": "Redditch MC",
    "FIELD2": ""
  },
  {
    "Court": "Hereford (Bath Street) MC",
    "FIELD2": ""
  },
  {
    "Court": "Welshpool MC",
    "FIELD2": ""
  },
  {
    "Court": "Canterbury MC",
    "FIELD2": ""
  },
  {
    "Court": "SE Northumberland Magistrates' Court",
    "FIELD2": ""
  },
  {
    "Court": "Salford MC",
    "FIELD2": ""
  },
  {
    "Court": "St Helens MC",
    "FIELD2": ""
  },
  {
    "Court": "Newton Abbot MC",
    "FIELD2": ""
  },
  {
    "Court": "Scottish Courts",
    "FIELD2": ""
  },
  {
    "Court": "Durham MC",
    "FIELD2": ""
  },
  {
    "Court": "King's Lynn Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Gloucester MC",
    "FIELD2": ""
  },
  {
    "Court": "Neath MC",
    "FIELD2": ""
  },
  {
    "Court": "Bournemouth County Court",
    "FIELD2": ""
  },
  {
    "Court": "Carmarthen MC",
    "FIELD2": ""
  },
  {
    "Court": "Bristol County Court",
    "FIELD2": ""
  },
  {
    "Court": "Gloucester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham Civil Justice Centre",
    "FIELD2": ""
  },
  {
    "Court": "Barnstaple MC",
    "FIELD2": ""
  },
  {
    "Court": "Central London County Court",
    "FIELD2": ""
  },
  {
    "Court": "Repatriated To This Country",
    "FIELD2": ""
  },
  {
    "Court": "Doncaster Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "West Norfolk Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Boston MC",
    "FIELD2": ""
  },
  {
    "Court": "Clerkenwell County Court",
    "FIELD2": ""
  },
  {
    "Court": "Darlington MC",
    "FIELD2": ""
  },
  {
    "Court": "Lancaster Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "North Shields County Court",
    "FIELD2": ""
  },
  {
    "Court": "Cardiff County Court",
    "FIELD2": ""
  },
  {
    "Court": "Runcorn County Court",
    "FIELD2": ""
  },
  {
    "Court": "Co Durham and Darlington EC",
    "FIELD2": ""
  },
  {
    "Court": "North Warwickshire MC",
    "FIELD2": ""
  },
  {
    "Court": "Courts Martial",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-Upon-Hull Combined Court Centre",
    "FIELD2": ""
  },
  {
    "Court": "Huntingdon Law Courts",
    "FIELD2": ""
  },
  {
    "Court": "Walsall (Aldridge) MC",
    "FIELD2": ""
  },
  {
    "Court": "Milton Keynes County Court",
    "FIELD2": ""
  },
  {
    "Court": "Stafford Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Jersey Courts",
    "FIELD2": ""
  },
  {
    "Court": "Swindon County Court",
    "FIELD2": ""
  },
  {
    "Court": "Chichester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Llandrindod Wells MC",
    "FIELD2": ""
  },
  {
    "Court": "Newcastle upon Tyne County Court",
    "FIELD2": ""
  },
  {
    "Court": "Nottingham County Court",
    "FIELD2": ""
  },
  {
    "Court": "Brighton Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Barrow-in-Furness County Court",
    "FIELD2": ""
  },
  {
    "Court": "North Norfolk Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "Neath and Port Talbot County Court",
    "FIELD2": ""
  },
  {
    "Court": "North Staffordshire MC - Fenton",
    "FIELD2": ""
  },
  {
    "Court": "Horsham MC",
    "FIELD2": ""
  },
  {
    "Court": "Warwick County Court",
    "FIELD2": ""
  },
  {
    "Court": "Oxford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bedford MC",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham (Bull Street) MC",
    "FIELD2": ""
  },
  {
    "Court": "Warrington Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Taunton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Aberdare County Court",
    "FIELD2": ""
  },
  {
    "Court": "Leicester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Liverpool County Court",
    "FIELD2": ""
  },
  {
    "Court": "Croydon County Court",
    "FIELD2": ""
  },
  {
    "Court": "Leeds County Court",
    "FIELD2": ""
  },
  {
    "Court": "Coventry County Court",
    "FIELD2": ""
  },
  {
    "Court": "Lincoln County Court",
    "FIELD2": ""
  },
  {
    "Court": "Lavender Hill MC",
    "FIELD2": ""
  },
  {
    "Court": "Central Family Court",
    "FIELD2": ""
  },
  {
    "Court": "Walsall County Court",
    "FIELD2": ""
  },
  {
    "Court": "Isle Of Man Courts",
    "FIELD2": ""
  },
  {
    "Court": "Marylebone (185 Marylebone Rd) MC",
    "FIELD2": ""
  },
  {
    "Court": "Durham County Court",
    "FIELD2": ""
  },
  {
    "Court": "Doncaster County Court",
    "FIELD2": ""
  },
  {
    "Court": "Truro County Court",
    "FIELD2": ""
  },
  {
    "Court": "Stafford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Cardiff Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Hereford Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Berwick upon Tweed MC",
    "FIELD2": ""
  },
  {
    "Court": "Plymouth County Court",
    "FIELD2": ""
  },
  {
    "Court": "Medway County Court",
    "FIELD2": ""
  },
  {
    "Court": "Middlesbrough County Court",
    "FIELD2": ""
  },
  {
    "Court": "Luton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Canterbury County Court",
    "FIELD2": ""
  },
  {
    "Court": "Wolverhampton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Derby County Court",
    "FIELD2": ""
  },
  {
    "Court": "Norwich County Court",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham Crown Court (Annex)",
    "FIELD2": ""
  },
  {
    "Court": "Hatton Cross- York House AIT",
    "FIELD2": ""
  },
  {
    "Court": "Stratford Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "North Shields AIT",
    "FIELD2": ""
  },
  {
    "Court": "Poole County Court",
    "FIELD2": ""
  },
  {
    "Court": "Wigan County Court",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Thames County Court",
    "FIELD2": ""
  },
  {
    "Court": "Barking (East Street) MC",
    "FIELD2": ""
  },
  {
    "Court": "Newport AIT",
    "FIELD2": ""
  },
  {
    "Court": "Portsmouth County Court",
    "FIELD2": ""
  },
  {
    "Court": "Hertford MC",
    "FIELD2": ""
  },
  {
    "Court": "Blackpool County Court",
    "FIELD2": ""
  },
  {
    "Court": "Barrow-in-Furness Combined Court",
    "FIELD2": ""
  },
  {
    "Court": "Brentford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Great Grimsby County Court",
    "FIELD2": ""
  },
  {
    "Court": "Brighton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Worcester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Barrow-in-Furness Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Newport (South Wales) County Court",
    "FIELD2": ""
  },
  {
    "Court": "Workington Magistrates Court",
    "FIELD2": ""
  },
  {
    "Court": "East Berkshire MC Bracknell Court House",
    "FIELD2": ""
  },
  {
    "Court": "Taylor House AIT",
    "FIELD2": ""
  },
  {
    "Court": "Bournemouth MC",
    "FIELD2": ""
  },
  {
    "Court": "Carlisle County Court",
    "FIELD2": ""
  },
  {
    "Court": "Preston County Court",
    "FIELD2": ""
  },
  {
    "Court": "Warwickshire Justice Centre (L'ton Spa)",
    "FIELD2": ""
  },
  {
    "Court": "Northen Ireland Courts",
    "FIELD2": ""
  },
  {
    "Court": "Nuneaton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Chelmsford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Manchester AIT",
    "FIELD2": ""
  },
  {
    "Court": "Aylesbury County Court",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Hull County Court",
    "FIELD2": ""
  },
  {
    "Court": "Caernarfon County Court",
    "FIELD2": ""
  },
  {
    "Court": "Chester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Guernsey Courts",
    "FIELD2": ""
  },
  {
    "Court": "Aylesbury MC",
    "FIELD2": ""
  },
  {
    "Court": "Stoke-on-Trent County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bromley County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bradford County Court",
    "FIELD2": ""
  },
  {
    "Court": "West Allerdale and Keswick YC",
    "FIELD2": ""
  },
  {
    "Court": "Yeovil County Court & Probation Office",
    "FIELD2": ""
  },
  {
    "Court": "Chichester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Hull Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Kidderminster Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Reading County Court",
    "FIELD2": ""
  },
  {
    "Court": "Southern Derbyshire Youth Court (Derby)",
    "FIELD2": ""
  },
  {
    "Court": "Warrington County Court",
    "FIELD2": ""
  },
  {
    "Court": "Skipton MC",
    "FIELD2": ""
  },
  {
    "Court": "Dorchester Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Birkenhead County Court",
    "FIELD2": ""
  },
  {
    "Court": "Sheffield County Court",
    "FIELD2": ""
  },
  {
    "Court": "Vale of Glamorgan MC",
    "FIELD2": " Barry"
  },
  {
    "Court": "Bridlington MC",
    "FIELD2": ""
  },
  {
    "Court": "C and SW Staffs Youth Court - Stafford",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham (Steelehouse Lane) MC",
    "FIELD2": ""
  },
  {
    "Court": "Wandsworth County Court",
    "FIELD2": ""
  },
  {
    "Court": "SE Staffs MC - Burton",
    "FIELD2": ""
  },
  {
    "Court": "Huddersfield County Court",
    "FIELD2": ""
  },
  {
    "Court": "Northampton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bradford AIT",
    "FIELD2": ""
  },
  {
    "Court": "Weston-super-Mare County Court",
    "FIELD2": ""
  },
  {
    "Court": "Watford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Cirencester MC",
    "FIELD2": ""
  },
  {
    "Court": "Warrington Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Manchester Civil Justice Centre",
    "FIELD2": ""
  },
  {
    "Court": "C and SW Staffs Youth Court - Cannock",
    "FIELD2": ""
  },
  {
    "Court": "Stoke on Trent AIT",
    "FIELD2": ""
  },
  {
    "Court": "Uxbridge County Court",
    "FIELD2": ""
  },
  {
    "Court": "Merthyr Tydfil County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bromley Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Woolwich County Court",
    "FIELD2": ""
  },
  {
    "Court": "Lewes County Court",
    "FIELD2": ""
  },
  {
    "Court": "Maidstone County Court",
    "FIELD2": ""
  },
  {
    "Court": "Stockport County Court",
    "FIELD2": ""
  },
  {
    "Court": "Lancaster County Court",
    "FIELD2": ""
  },
  {
    "Court": "Solihull MC",
    "FIELD2": ""
  },
  {
    "Court": "Caernarfon Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Nottingham Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Burnley County Court",
    "FIELD2": ""
  },
  {
    "Court": "Cheltenham County Court",
    "FIELD2": ""
  },
  {
    "Court": "Nottingham AIT",
    "FIELD2": ""
  },
  {
    "Court": "Slough County Court",
    "FIELD2": ""
  },
  {
    "Court": "Darlington County Court",
    "FIELD2": ""
  },
  {
    "Court": "East London County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bodmin County Court",
    "FIELD2": ""
  },
  {
    "Court": "Hartlepool MC",
    "FIELD2": ""
  },
  {
    "Court": "Wimborne MC",
    "FIELD2": ""
  },
  {
    "Court": "Harrow MC",
    "FIELD2": ""
  },
  {
    "Court": "Tameside County Court",
    "FIELD2": ""
  },
  {
    "Court": "Swansea Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Shrewsbury MC",
    "FIELD2": ""
  },
  {
    "Court": "Doncaster Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Canterbury Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Willesden County Court",
    "FIELD2": ""
  },
  {
    "Court": "Basingstoke County Court",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham AIT",
    "FIELD2": ""
  },
  {
    "Court": "Salisbury County Court",
    "FIELD2": ""
  },
  {
    "Court": "Mansfield County Court",
    "FIELD2": ""
  },
  {
    "Court": "Middlesex Guildhall Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Shrewsbury County Court",
    "FIELD2": ""
  },
  {
    "Court": "High Wycombe County Court",
    "FIELD2": ""
  },
  {
    "Court": "Mold County Court",
    "FIELD2": ""
  },
  {
    "Court": "N Staffs Youth Court - Fenton",
    "FIELD2": ""
  },
  {
    "Court": "Telford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Ipswich County Court",
    "FIELD2": ""
  },
  {
    "Court": "Manchester City Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "South Warwickshire Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Peterborough County Court",
    "FIELD2": ""
  },
  {
    "Court": "Exeter County Court",
    "FIELD2": ""
  },
  {
    "Court": "Glasgow AIT",
    "FIELD2": ""
  },
  {
    "Court": "Aldershot MC",
    "FIELD2": ""
  },
  {
    "Court": "Blackburn County Court",
    "FIELD2": ""
  },
  {
    "Court": "Chesterfield County Court",
    "FIELD2": ""
  },
  {
    "Court": "Shoreditch County Court",
    "FIELD2": ""
  },
  {
    "Court": "Leeds Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Newport (I.O.W.) County Court",
    "FIELD2": ""
  },
  {
    "Court": "Belfast AIT",
    "FIELD2": ""
  },
  {
    "Court": "Wirral Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Leicester Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Gateshead County Court",
    "FIELD2": ""
  },
  {
    "Court": "Hastings County Court",
    "FIELD2": ""
  },
  {
    "Court": "Prestatyn MC",
    "FIELD2": ""
  },
  {
    "Court": "Wycombe Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Hammersmith MC",
    "FIELD2": ""
  },
  {
    "Court": "Bath County Court",
    "FIELD2": ""
  },
  {
    "Court": "Liverpool Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Torquay and Newton Abbot County Court",
    "FIELD2": ""
  },
  {
    "Court": "Coventry Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Carmarthen Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Abertillery MC",
    "FIELD2": ""
  },
  {
    "Court": "West London County Court",
    "FIELD2": ""
  },
  {
    "Court": "Walsall Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Haverfordwest Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Aberystwyth County Court",
    "FIELD2": ""
  },
  {
    "Court": "Winchester County Court",
    "FIELD2": ""
  },
  {
    "Court": "St. Albans County Court",
    "FIELD2": ""
  },
  {
    "Court": "Huyton MC",
    "FIELD2": ""
  },
  {
    "Court": "Woolwich MC",
    "FIELD2": ""
  },
  {
    "Court": "Romford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Basildon County Court",
    "FIELD2": ""
  },
  {
    "Court": "King's Lynn County Court",
    "FIELD2": ""
  },
  {
    "Court": "Dudley County Court",
    "FIELD2": ""
  },
  {
    "Court": "West Berkshire MC",
    "FIELD2": ""
  },
  {
    "Court": "St. Helens County Court",
    "FIELD2": ""
  },
  {
    "Court": "Inner London Youth Courts Centre 2",
    "FIELD2": ""
  },
  {
    "Court": "Bury St Edmunds MC",
    "FIELD2": ""
  },
  {
    "Court": "Hereford Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Bridgwater MC",
    "FIELD2": ""
  },
  {
    "Court": "Tynedale Magistrates' Court",
    "FIELD2": ""
  },
  {
    "Court": "Ipswich Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Furness and District Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Cambridge County Court",
    "FIELD2": ""
  },
  {
    "Court": "Southampton County Court",
    "FIELD2": ""
  },
  {
    "Court": "Southampton Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "WORKINGTON COUNTY COURT",
    "FIELD2": ""
  },
  {
    "Court": "Southend County Court",
    "FIELD2": ""
  },
  {
    "Court": "Leamington Spa County Court",
    "FIELD2": ""
  },
  {
    "Court": "Guildford County Court",
    "FIELD2": ""
  },
  {
    "Court": "York County Court",
    "FIELD2": ""
  },
  {
    "Court": "Merthyr Tydfil Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Beverley Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Ormskirk MC",
    "FIELD2": ""
  },
  {
    "Court": "Bexley Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Weston-super-Mare Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Weymouth County Court",
    "FIELD2": ""
  },
  {
    "Court": "Wakefield County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bradford Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "South Sefton Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "South Shields County Court",
    "FIELD2": ""
  },
  {
    "Court": "Sheffield Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Hertford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Grimsby Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Tameside Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Torquay MC",
    "FIELD2": ""
  },
  {
    "Court": "Wareham MC",
    "FIELD2": ""
  },
  {
    "Court": "Blackwood County Court",
    "FIELD2": ""
  },
  {
    "Court": "Welshpool Crown Court",
    "FIELD2": ""
  },
  {
    "Court": "Northallerton MC",
    "FIELD2": ""
  },
  {
    "Court": "Worthing Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Scarborough County Court",
    "FIELD2": ""
  },
  {
    "Court": "Banbury MC",
    "FIELD2": ""
  },
  {
    "Court": "Swansea County Court",
    "FIELD2": ""
  },
  {
    "Court": "Bridport MC",
    "FIELD2": ""
  },
  {
    "Court": "Basingstoke Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Cheshunt MC",
    "FIELD2": ""
  },
  {
    "Court": "NE Derby/Dales Youth Crt (Chesterfield)",
    "FIELD2": ""
  },
  {
    "Court": "Mold Combined Court",
    "FIELD2": ""
  },
  {
    "Court": "Swindon Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Highgate MC",
    "FIELD2": ""
  },
  {
    "Court": "Barking Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Aldershot and Farnham County Court",
    "FIELD2": ""
  },
  {
    "Court": "Ilford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Northwich MC",
    "FIELD2": ""
  },
  {
    "Court": "Leigh County Court",
    "FIELD2": ""
  },
  {
    "Court": "North Shields Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Birmingham Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Aberdare MC",
    "FIELD2": ""
  },
  {
    "Court": "Barnet MC",
    "FIELD2": ""
  },
  {
    "Court": "Burton-upon-Trent County Court",
    "FIELD2": ""
  },
  {
    "Court": "Walsall AIT",
    "FIELD2": ""
  },
  {
    "Court": "East Berkshire MC Maidenhead Court House",
    "FIELD2": ""
  },
  {
    "Court": "Horsham County Court",
    "FIELD2": ""
  },
  {
    "Court": "Inner London Youth Courts Centre 1",
    "FIELD2": ""
  },
  {
    "Court": "Kingston-upon-Thames Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Aberdare Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Camborne MC",
    "FIELD2": ""
  },
  {
    "Court": "Newton MC",
    "FIELD2": ""
  },
  {
    "Court": "Bromley AIT",
    "FIELD2": ""
  },
  {
    "Court": "Dartford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Croydon Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Bicester MC",
    "FIELD2": ""
  },
  {
    "Court": "S.Derbyshire Youth Court (Ilkeston)",
    "FIELD2": ""
  },
  {
    "Court": "Poole Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "North Warwickshire Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Carlisle and District Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Cambridge Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Chatham Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Salford County Court",
    "FIELD2": ""
  },
  {
    "Court": "Colchester County Court",
    "FIELD2": ""
  },
  {
    "Court": "Wakefield MC",
    "FIELD2": ""
  },
  {
    "Court": "Daventry MC",
    "FIELD2": ""
  },
  {
    "Court": "Isle of Wight Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Luton Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Feltham MC",
    "FIELD2": ""
  },
  {
    "Court": "South Western (Balham) MC",
    "FIELD2": ""
  },
  {
    "Court": "Horseferry Road MC",
    "FIELD2": ""
  },
  {
    "Court": "Halifax MC",
    "FIELD2": ""
  },
  {
    "Court": "Guisborough MC",
    "FIELD2": ""
  },
  {
    "Court": "UNKNOWN LOCATION",
    "FIELD2": ""
  },
  {
    "Court": "Flint (Bodhyfryd) Mag Court",
    "FIELD2": ""
  },
  {
    "Court": "Knowlsey Youth Court",
    "FIELD2": ""
  },
  {
    "Court": "Huntingdon County Court",
    "FIELD2": ""
  }
]

const ccpage = document.getElementsByClassName("cc")[0];

if (ccpage){
  const target = document.getElementById("conditional-concurrent")
  let data = JSON.parse(localStorage.getItem('sentenceItem'))
  console.log(data);

  for(let x of data) {
    let offenceOption = `<option class="offence-option" value='offence 1 ${x.offence.offence}'>Offence ${x.id} ${x.offence.offence}</option>`
    let offenceRadio = `  <div class="govuk-radios__item ">
                                <input class="govuk-radios__input ccOffence" 
                                id='consecutive-or-concurrent-${x.id}' 
                                name='concurrent-sentence' 
                                type="radio" 
                                value='Offence ${x.id}'
                                >
                                <label class="govuk-label govuk-radios__label" 
                                for='concurrent-sentence-${x.id}'>
                                    Offence ${x.id} </br>
                                    <strong>${x.offence.offence}</strong> </br>
                                    Sentenced: ${x.sentenceDate}
                                </label>
                            </div>`
    target.innerHTML += offenceRadio;
  }
}
// const y = JSON.stringify(sentenceTypes);
//
// cd = document.getElementById("cd")
// for(let x of sentenceTypes) {
//   console.log(x)
//   let p = `<option value='${x.SentenceType}'>${x.SentenceType}</option>`
//   document.write(p)
//   cd.innerHTML += p
// }