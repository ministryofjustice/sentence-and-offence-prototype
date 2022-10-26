document.addEventListener("DOMContentLoaded", () => {
console.log("ready")


const myObject = {
  name:"john",
  age: 32,
}
let arr = [];
const entries = {  };

window.localStorage.setItem("dataObject", "" );
window.localStorage.setItem("data", JSON.stringify(arr) );
//window.localStorage.setItem("dataObject", JSON.stringify(entries));

const nameInputButton = document.querySelector('[data-name="name-input-button"]');
const nameInput = document.querySelector('[data-name="name-input"]');
const list =document.querySelector(".data");
if(list){

  const data = JSON.parse(localStorage.getItem('myLunch'));
  console.log(data)

  for(let x of data) {
    list.innerHTML+=(`<p>Name: ${x.name} Age: ${x.age}</p>`)
  }
}

const ageInput = document.querySelector('[data-name="age-input"]');
const ageInputButton = document.querySelector('[data-name="age-input-button"]');
const resultsButton = document.querySelector('[data-name="results-button"]');


const offenceSelect = document.querySelector('[data-name="offence"]');
const offenceSelectButton = document.querySelector('[data-name="offence-button"]');

const offenceEndDay = document.getElementById("offence-end-day");
const offenceEndMonth = document.getElementById("offence-end-month");
const offenceEndYear = document.getElementById("offence-end-year");

const offenceStartDay = document.getElementById("offence-start-day");
const offenceStartMonth = document.getElementById("offence-start-month");
const offenceStartYear = document.getElementById("offence-start-year");

//warrant data items

  const warrantButton = document.getElementById("WarrantButton")
  if (warrantButton) {
    const warrantDateDay = document.getElementById("WarrantDay")
    const warrantDateMonth = document.getElementById("WarrantMonth")
    const warrantDateYear = document.getElementById("WarrantYear")
    const courtName = document.getElementById("court-name");
    const caseRef = document.getElementById("CaseRef");
    //const remandBasis = document.getElementById("remand");
    const hearingType = document.getElementById("hearing-type");
    const outcome = document.getElementById("hearing-outcome");
    const courtDateDay = document.getElementById("court-day");
    const courtDateMonth = document.getElementById("court-month");
    const courtDateYear = document.getElementById("court-year");
    console.log("button")
    warrantButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(courtName.value);
      const warrantDate = createDate(warrantDateDay, warrantDateMonth, warrantDateYear);
      const courtDate = createDate(courtDateDay, courtDateMonth, courtDateYear);

      storeWarrantDetails(warrantDate, courtName.value, caseRef.value, hearingType.value,outcome.value, courtDate)

      location.href = 'add-offence-details.html';
    })
  }
  function storeWarrantDetails(warrantDate, court, ref, hearing, outcome, courtDate) {
    console.log("called")
    let warrantDetails = localStorage.getItem('warrantDetails');
    warrantDetails = warrantDetails ? JSON.parse(warrantDetails) : [];

    let warrant = {
      warrantDate:warrantDate,
      court: court,
      ref: ref,
      hearing: hearing,
      outcome: outcome,
      courtDate: courtDate
    }
    arr = JSON.stringify(warrantDetails)
    warrantDetails.push(warrant)
    localStorage.setItem('warrantDetails', JSON.stringify(warrantDetails));

  }
const warrantDetailsContainer = document.getElementById("warrant-details");
  if(warrantDetailsContainer) {
    let warrantDetails = JSON.parse(localStorage.getItem('warrantDetails'));
    console.log(warrantDetails)

    let warrantInfo = `
        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Date of warrant
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].warrantDate}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> date</span>
                                </a>
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Court name
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].court}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> date of birth</span>
                                </a>
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Case reference
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].ref}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> address</span>
                                </a>
                            </dd>
                        </div>
                   
                                <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Outcome
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].outcome}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> contact details</span>
                                </a>
                            </dd>
                        </div>
                             <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Hearing type
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].hearing}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> contact details</span>
                                </a>
                            </dd>
                        </div>
                          <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Next court date
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].courtDate}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> contact details</span>
                                </a>
                            </dd>
                        </div>

    `
    warrantDetailsContainer.innerHTML = warrantInfo;
  }
function createOffenceStartDate(day, month, year) {
  let date = `${day}-${month}-${year}`;
  return date
}

function createOffenceEndDate(day, month, year) {
  let date = `${day.value}-${month.value}-${year.value}`;
  return date
}

  function createDate(day, month, year) {
    let date = `${day.value}-${month.value}-${year.value}`;
    return date
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
    const outcome = document.getElementById("outcome");
    e.preventDefault();
    let date = createDate(courtDay, courtMonth, courtYear)
    console.log(courtName.value, date, caseReference.value, hearing.value, outcome.value)
    addCourtDetails(courtName.value, date, caseReference.value, hearing.value, outcome.value)

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
      outcome: outcome
    }
    //arr = JSON.stringify(courtDetails)
    //courtDetails.push(courtDetailsObject);

    //localStorage.setItem('courtDetails', JSON.stringify(courtDetails))
    localStorage.setItem('courtDetails', JSON.stringify(courtDetailsObject))
    console.log(2, courtDetails, localStorage.getItem('courtDetails'))
  }
}

  const addSentenceButton = document.getElementById("add-sentence-button")
if(addSentenceButton) {

  addSentenceButton.addEventListener("click", function (e) {
    e.preventDefault()

    const offence = document.getElementById("offence-picker");
    const offenceStartDay = document.getElementById("offence-start-day");
    const offenceStartMonth = document.getElementById("offence-start-month");
    const offenceStartYear = document.getElementById("offence-start-year");
    const offenceEndDay = document.getElementById("offence-end-day");
    const offenceEndMonth = document.getElementById("offence-end-month");
    const offenceEndYear = document.getElementById("offence-end-year");
    const sentenceType = document.getElementById("sentence-type");
    const sentenceDay = document.getElementById("sentence-date-day");
    const sentenceMonth = document.getElementById("sentence-date-month");
    const sentenceYear = document.getElementById("sentence-date-year");
    const sentenceLengthYears = document.getElementById("sentence-length-years");
    const sentenceLengthMonths = document.getElementById("sentence-length-months");
    const sentenceLengthWeeks = document.getElementById("sentence-length-weeks");
    const sentenceLengthDays = document.getElementById("sentence-length-days");

    let startDate = createDate(offenceStartDay, offenceStartMonth, offenceStartYear);
    let endDate = createDate(offenceEndDay, offenceEndMonth, offenceEndYear);
    let sentenceDate = createDate(sentenceDay, sentenceMonth, sentenceYear);

    addSentence(offence.value,
      startDate,
      endDate,
      sentenceDate,
      sentenceType.value,
      sentenceLengthYears.value,
      sentenceLengthMonths.value,
      sentenceLengthWeeks.value,
      sentenceLengthDays.value);

    location.href = 'sentences.html';
  })

  function addSentence (offence,
    offenceDate,
    offenceEndDate,
    sentenceDate,
    sentenceType,
    sentenceLengthYears,
    sentenceLengthMonths,
    sentenceLengthWeeks,
    sentenceLengthDays) {

    let sentenceList = localStorage.getItem('sentenceList');
    sentenceList = sentenceList ? JSON.parse(sentenceList) : []
    let count = sentenceList.length;

    let sentence = {
      id: count + 1,
      offence: offence,
      offenceDate: offenceDate,
      offenceEndDate: offenceEndDate,
      sentenceDate: sentenceDate,
      sentenceType: sentenceType,
      sentenceLengthYears: sentenceLengthYears,
      sentenceLengthMonths: sentenceLengthMonths,
      sentenceLengthWeeks: sentenceLengthWeeks,
      sentenceLengthDays: sentenceLengthDays
    }

    updateData("sentenceList", sentenceList, sentence)

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
                    <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Case outcome
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${courtData.outcome}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>`
  courtDetails.innerHTML += court;

}
  const sentenceSummaryContainer = document.getElementById("SentenceListSummary")
  if(sentenceSummaryContainer){
    const sentenceData = localStorage.getItem('sentenceList');
    const sentenceDataList = JSON.parse(sentenceData);
    for (let x of sentenceDataList) {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                                <p><strong>Offence: </strong>${x.offence}</p>
                            <p><strong>Sentence Length: </strong>
                            <span>${x.sentenceLengthDays} days</span>
                            <span>${x.sentenceLengthWeeks} weeks</span>
                            <span>${x.sentenceLengthMonths} months</span>
                            <span>${x.sentenceLengthYears} years</span>
                            </p>
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

//helper functions

function updateData(lsName, dataItem, dataObject){
  arr = JSON.stringify(dataItem)
  dataItem.push(dataObject);
  localStorage.setItem(lsName, JSON.stringify(dataItem))
  console.log(2, dataItem)
}
function addOffence(offence, on , to) {

  let offenceList = localStorage.getItem('offenceList');
  offenceList = offenceList ? JSON.parse(offenceList) : []
  let count = offenceList.length;

  let oo = {
    id:count +1,
    offence:offence,
    onDate:on,
    endDate:to
  }
  arr = JSON.stringify(offenceList)
  offenceList.push(oo);

  localStorage.setItem('offenceList', JSON.stringify(offenceList))

  console.log(2, offenceList, localStorage.getItem('offenceList'))

}

if (offenceSelectButton) {
  offenceSelectButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem('offence', offenceSelect.value)

    const offence =  localStorage.getItem('offence')
    const startDate = createOffenceStartDate(offenceStartDay.value, offenceStartMonth.value, offenceStartYear.value);
    const endDate = createOffenceEndDate(offenceEndDay, offenceEndMonth, offenceEndYear);

    console.log(localStorage.getItem('offence'))
    addOffence( offence, startDate, endDate);
    location.href = 'check-your-answers.html';
  })
}
  const offencesContainer = document.getElementById("OffenceList");
  const offencesSummaryContainer = document.getElementById("OffenceListSummary");
if(offencesContainer) {
  const offenceData = localStorage.getItem('offenceList');
  const offenceDataList = JSON.parse(offenceData);
  console.log(offenceDataList)

  for (let x of offenceDataList) {
    let newOffence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                            ${x.offence}
                        </dt>
                        <dd class="govuk-summary-list__actions hmrc-summary-list__actions">
                            <ul class="govuk-summary-list__actions-list">
                                <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                                <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                            </ul>
                        </dd>
                    </div>`
    offencesContainer.innerHTML += newOffence;
  }
}



//
if(offencesSummaryContainer){
  const offenceData = localStorage.getItem('offenceList');
  const offenceDataList = JSON.parse(offenceData);
  for (let x of offenceDataList) {
    let newOffence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                            ${x.offence}
                        </dt>
                          <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="check-your-answers.html">
                                    Change<span class="govuk-visually-hidden"> previous application number</span>
                                </a>
                            </dd>
                        
                    </div>`
    offencesSummaryContainer.innerHTML += newOffence;
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
if(resultsButton) {
  resultsButton.addEventListener("click", function (e) {
    e.preventDefault();
    myObject.name = localStorage.getItem()
    localStorage.setItem('object', ageInput.value);
    console.log(localStorage.getItem('age'));
    console.log(localStorage.getItem('name'));
    location.href= 'result.html';
  })
}

const sentenceContainer = document.getElementById("sentence-list")

  if(sentenceContainer) {
    const sentenceData = localStorage.getItem('sentenceList');
    const sentenceDataList = JSON.parse(sentenceData);
    console.log(sentenceDataList)

    for (let x of sentenceDataList) {
      let newSentence = `<div class="govuk-summary-list__row">
                        <dt class="govuk-summary-list__key govuk-!-font-weight-regular hmrc-summary-list__key">
                            <p><strong>Offence: </strong>${x.offence}</p>
                            <p><strong>Sentence Length: </strong>
                            <span>${x.sentenceLengthDays} days</span>
                            <span>${x.sentenceLengthWeeks} weeks</span>
                            <span>${x.sentenceLengthMonths} months</span>
                            <span>${x.sentenceLengthYears} years</span>
                            </p>
                        </dt>
                        <dd class="govuk-summary-list__actions hmrc-summary-list__actions">
                            <ul class="govuk-summary-list__actions-list">
                                <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                                <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                            </ul>
                        </dd>
                    </div>`
      sentenceContainer.innerHTML += newSentence;
    }
  }

  function getDropdownValue(option){
    const optionValue = option.length && option.find(c => c.selected).value;
    return optionValue
  }

  function getRadioValue(option){
    const optionValue = option.length && option.find(c => c.checked).value;
    return optionValue
  }

  const page = document.getElementsByClassName('cc')[0];

  if (page) {
    const offence = document.getElementById("offence-picker");
    const offenceStartDay = document.getElementById("offence-start-day");
    const offenceStartMonth = document.getElementById("offence-start-month");
    const offenceStartYear = document.getElementById("offence-start-year");
    const offenceEndDay = document.getElementById("offence-end-day");
    const offenceEndMonth = document.getElementById("offence-end-month");
    const offenceEndYear = document.getElementById("offence-end-year");
    const sentenceType = document.getElementById("sentence-type");
    const sentenceDay = document.getElementById("sentence-date-day");
    const sentenceMonth = document.getElementById("sentence-date-month");
    const sentenceYear = document.getElementById("sentence-date-year");
    const sentenceLengthYears = document.getElementById("sentence-length-years");
    const sentenceLengthMonths = document.getElementById("sentence-length-months");
    const sentenceLengthWeeks = document.getElementById("sentence-length-weeks");
    const sentenceLengthDays = document.getElementById("sentence-length-days");

    const pageButton = document.getElementById('add-sentence-button2');
    const caseList = document.getElementById('cases');
    const ccInput = Array.from(document.getElementsByClassName('cc-input'));
    const cases = Array.from(document.getElementsByClassName('case-option'));
    const offences = Array.from(document.getElementsByClassName('offence-option'));
    //const ccValue = document.querySelector('input[name="cc-value"]:checked').value;

    let startDate = createDate(offenceStartDay, offenceStartMonth, offenceStartYear);
    let endDate = createDate(offenceEndDay, offenceEndMonth, offenceEndYear);
    let sentenceDate = createDate(sentenceDay, sentenceMonth, sentenceYear);

    pageButton.addEventListener("click", function (e){
      e.preventDefault();
      //const caseNumber = cases.length && cases.find(c => c.selected).value;
      const toOffence = getDropdownValue(offences)
      const caseNumber = getDropdownValue(cases)
      const cc = getRadioValue(ccInput)
      console.log(cc, caseNumber, toOffence);
      localStorage.getItem('sentenceList')
      addSentence2(offence.value,
        startDate,
        endDate,
        sentenceDate,
        sentenceType.value,
        sentenceLengthYears.value,
        sentenceLengthMonths.value,
        sentenceLengthWeeks.value,
        sentenceLengthDays.value,
        cc,
        toOffence);
      console.log(('sentenceList'))

      location.href = 'sentences.html';
    })


  }
  function addSentence2 (offence,
    offenceDate,
    offenceEndDate,
    sentenceDate,
    sentenceType,
    sentenceLengthYears,
    sentenceLengthMonths,
    sentenceLengthWeeks,
    sentenceLengthDays,
    cc,
    toOffence) {

    let sentenceList = localStorage.getItem('sentenceList');
    sentenceList = sentenceList ? JSON.parse(sentenceList) : []
    let count = sentenceList.length;

    let sentence = {
      id: count + 1,
      offence: offence,
      offenceDate: offenceDate,
      offenceEndDate: offenceEndDate,
      sentenceDate: sentenceDate,
      sentenceType: sentenceType,
      sentenceLengthYears: sentenceLengthYears,
      sentenceLengthMonths: sentenceLengthMonths,
      sentenceLengthWeeks: sentenceLengthWeeks,
      sentenceLengthDays: sentenceLengthDays,
      cc:cc,
      toOffence: toOffence
    }

    updateData("sentenceList", sentenceList, sentence)

  }
});


//add object to array



//list array items
