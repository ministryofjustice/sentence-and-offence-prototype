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


function createOffenceStartDate(day, month, year) {
  let date = `${day}-${month}-${year}`;
  return date
}


function createOffenceEndDate(day, month, year) {
  let date = `${day.value}-${month.value}-${year.value}`;
  return date
}
//add item to object

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
                        <dd class="govuk-summary-list__actions hmrc-summary-list__actions">
                            <ul class="govuk-summary-list__actions-list">
                                <li class="govuk-summary-list__actions-list-item"><a class="govuk-link" href="#"><span aria-hidden="true">Change</span><span class="govuk-visually-hidden">Change Sydney Russell</span></a></li>
                                <li class="govuk-summary-list__actions-list-item"><a data-name="remove-link-${x.id}" class="govuk-link remove-link" href="#"><span aria-hidden="true">Remove</span><span class="govuk-visually-hidden">Remove Sydney Russell from the list</span></a></li>
                            </ul>
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
  routeButton.addEventListener("click", function(e) {
    e.preventDefault()
    radioRoute()
  })
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