console.log("g");

let arr = [];

function createDate(day, month, year) {
  let date = `${day.value}-${month.value}-${year.value}`;
  return date
}

function printSentence(days, weeks, months, years) {
  let d = days.value ? days.value : "0";
  let w = weeks.value ? weeks.value : "0";
  let m = months.value ? months.value : "0";
  let y = years.value ? years.value : "0";
  let sentence = ` ${y} years ${m} months ${w} weeks ${d} days `;
  return sentence
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

function addSentence(offence, sentence, convictionDate, sentenceType, sentenceDate, sentenceLength){
  let sentenceItem = localStorage.getItem('sentenceItem');
  sentenceItem = sentenceItem ? JSON.parse(sentenceItem) : []

  let oo = {
    offence: JSON.parse(offence),
    sentence: sentence,
    sentenceType: sentenceType,
    sentenceDate: sentenceDate,
    sentenceLength: sentenceLength
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
  }else {
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

    addSentence(offence, convictionDate, sentenceType, sentenceDate, sentenceLength)
    location.href = 'sentences.html';
  })
}

const sentenceListButton = document.getElementById("checkButton")
const sentenceList = document.getElementById("sentence-list");
if(sentenceList){
  const dataDump = localStorage.getItem("sentenceItem")
  const data = JSON.parse(dataDump)
  console.log("f",JSON.parse(dataDump))

  for(let x of data){
    if(x.offence.outcome === "Guilty") {
      let listItem = `
                    <div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                            <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                            <p><strong>Sentence Length: </strong>
                            <span>${x.sentenceDate} </span></p>
                       
                        
                        </dt>
                        <dd class="govuk-summary-list__actions hmrc-summary-list__actions">
                            <ul class="govuk-summary-list__actions-list">
                                <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                                <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                            </ul>
                        </dd>
                    </div>
        `
      sentenceList.innerHTML += listItem
    } else {
      let listItem = `
                    <div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                            <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                          
                       
                        
                        </dt>
                        <dd class="govuk-summary-list__actions hmrc-summary-list__actions">
                            <ul class="govuk-summary-list__actions-list">
                                <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                                <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                            </ul>
                        </dd>
                    </div>
        `
      sentenceList.innerHTML += listItem
    }
  }
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
    const hearing = document.getElementById("hearing-type");
   //const outcome = document.getElementById("outcome");
    e.preventDefault();
    let date = createDate(courtDay, courtMonth, courtYear)
    //console.log(courtName.value, date, caseReference.value, hearing.value, outcome.value)
    addCourtDetails(courtName.value, date, caseReference.value, hearing.value)

    location.href = 'add-a-sentence.html';
  })

  function addCourtDetails (court, date, ref, hearing, outcome) {
    let courtDetails = localStorage.getItem('courtDetails');
    console.log(courtDetails)
    courtDetails = courtDetails ? JSON.parse(courtDetails) : []
    //let count = courtDetails.length;

    let courtDetailsObject = {
      court: court,
      date: date,
      ref: ref,
      hearing: hearing,
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
  for (let x of sentenceDataList) {
    if(x.offence.outcome === "Guilty") {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                           <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                            <p><strong>Sentence Length: </strong>
                            <span>${x.sentenceDate}</span></p>
                        </dt>
                          <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                            </dd>
                        
                    </div>`
      sentenceSummaryContainer.innerHTML += newSentence;
    } else {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                           <p><strong>Offence: </strong>${x.offence.offence}</p>
                            <p><strong>Verdict: </strong>${x.offence.outcome}</p>
                        </dt>
                          <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                            </dd>
                        
                    </div>`
      sentenceSummaryContainer.innerHTML += newSentence;
    }
  }
}

const courtDetails = document.getElementById("court-details");
if (courtDetails) {
  const courtData = JSON.parse(localStorage.getItem('courtDetails'));
  console.log(courtData)
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
                          Case referrence
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
                          Hearing type
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${courtData.hearing}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                 `
  courtDetails.innerHTML += court;

}