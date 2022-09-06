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
    const remandBasis = document.getElementById("remand");
    const hearingType = document.getElementById("hearing-type");
    const outcome = document.getElementById("hearing-outcome");
    const courtDateDay = document.getElementById("court-day");
    const courtDateMonth = document.getElementById("court-month");
    const courtDateYear = document.getElementById("court-year");
    console.log("button")
    warrantButton.addEventListener("click", function (e) {
      e.preventDefault();

      const warrantDate = createDate(warrantDateDay, warrantDateMonth, warrantDateYear);
      const courtDate = createDate(courtDateDay, courtDateMonth, courtDateYear);

      storeWarrantDetails(warrantDate, courtName.value, caseRef.value, remandBasis.value, hearingType.value,outcome.value, courtDate)

      location.href = 'add-offence-details.html';
    })
  }
  function storeWarrantDetails(warrantDate, court, ref, basis, hearing, outcome, courtDate) {
    console.log("called")
    let warrantDetails = localStorage.getItem('warrantDetails');
    warrantDetails = warrantDetails ? JSON.parse(warrantDetails) : [];

    let warrant = {
      warrantDate:warrantDate,
      court: court,
      ref: ref,
      basis:basis,
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
                                Case Reference
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
                                Basis of remand
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${warrantDetails[0].basis}
                             
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="warrant-details.html">
                                    Change<span class="govuk-visually-hidden"> contact details</span>
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
                                Next Court date
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


  // function addSentence(offence, offenceDate , sentenceDate, sentenceLength) {
  //
  //   let sentenceList = localStorage.getItem('sentenceList');
  //   sentenceList = sentenceList ? JSON.parse(sentenceList) : []
  //   let count = sentenceList.length;
  //
  //   let sentence = {
  //     id:count +1,
  //     offence:offence,
  //     offenceDate:offenceDate,
  //     sentenceDate:sentenceDate,
  //     sentenceLength: sentenceLength
  //   }
  //   arr = JSON.stringify(sentenceList)
  //   sentenceList.push(sentence);
  //
  //   localStorage.setItem('sentenceList', JSON.stringify(sentenceList))
  //
  //   console.log(2, sentenceList, localStorage.getItem('sentenceList'))
  //
  // }
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

//add object to array



//list array items

});