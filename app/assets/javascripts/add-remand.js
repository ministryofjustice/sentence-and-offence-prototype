console.log("here")
//set up data

let adjustments = localStorage.getItem('adjustments');
adjustments = adjustments ? JSON.parse(adjustments) : [];

let dates = localStorage.getItem('dates');
dates = dates ? JSON.parse(dates) : [];
let selectedOffences = [];

let totalDays = 0;
for(let x of adjustments){
  totalDays += x.days;
}
//add-remand-dates-button

function radioRoute (radios) {
  for (let x of radios) {
    if (x.checked) {
      let route = x.getAttribute("data-route")
      location.href = `${route}.html`;
    }
  }
}

const addDatesButton = document.getElementById("add-remand-dates-button")
const addOffencesButton = document.getElementById("add-offences-button")
const reviewButton = document.getElementById('review-remand-button')
const displayRemandContainer = document.getElementById('periodsOfRemand')

if(reviewButton){
  document.getElementById('totalDays').innerHTML = totalDays
  console.log(adjustments)
  for(let x of adjustments) {
    displayRemandPeriod(x,displayRemandContainer);
  }

  reviewButton.addEventListener('click', function(e){
    e.preventDefault()
    let radios = document.getElementsByClassName('govuk-radios__input');
    radioRoute(radios);
  })

}

function displayRemandPeriod(x, target){
  let html = `    <dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                               Period of remand
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${x.start} to ${x.end}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="#">
                                    Change<span class="govuk-visually-hidden"> name</span>
                                </a>
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                               Offences
                            </dt>
                            <dd class="govuk-summary-list__value">
                                <ul class="govuk-list">
                                    ${listOffences(x.offences)}
                                </ul>
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="#">
                                    Change<span class="govuk-visually-hidden"> address</span>
                                </a>
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Days spent on remand
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${x.days}
                            </dd>

                        </div>
                    </dl>`
  target.innerHTML += html
}

function listOffences(offences) {
  let html = ``
  for(let x of offences){
    let row = `<li>${x.offence}</li>`
    html += row
  }
  return html
}


let unusedDeductions = document.getElementById("unusedDeductions");

if(unusedDeductions) {
  document.getElementById('saveTableTotal').innerHTML = totalDays
  let html = `

 
    <dl class="govuk-summary-list">
  <div class="govuk-summary-list__row">
    <dt class="govuk-summary-list__key">
      Unused remand
    </dt>
    <dd class="govuk-summary-list__value">
      18 days
    </dd>
  </div>
    <div class="govuk-summary-list__row">
    <dt class="govuk-summary-list__key">
      Unused tagged bail
    </dt>
    <dd class="govuk-summary-list__value">
      0 days
    </dd>
  </div>
</dl>

`

  if(totalDays >=50) {
    unusedDeductions.innerHTML = html
  }
}

let saveTable = document.getElementById('tableBody')
if(saveTable){
  console.log(totalDays)
  document.getElementById('saveTableTotal').innerHTML = totalDays
  if(totalDays >= 50) {
    let alert = `
<h2 class="govuk-heading-m">There is unused remand</h2>
    <p class="govuk-body-l">
      Based on this entry, there are 18 days of unused remand, which will not be taken into the sentence calculation.
    </p>
`
    console.log(totalDays)
    document.getElementById("alerthere").innerHTML = alert
  }
function createTableRow(data){
  let html = ``
  for(let x of data){
    let row = `  <tr class="govuk-table__row">
                            <th scope="row" class="govuk-table__header">${x.start}to ${x.end}</th>
                            <td class="govuk-table__cell">${x.days}</td>
                        </tr>`
    html += row
  }
  return html
}
  let html = `${createTableRow(adjustments)}`
  saveTable.innerHTML = html
}


if(addOffencesButton) {
  let activeId = adjustments.length+1
  //get record
  const result = dates.find(({ caseNo }) => caseNo === activeId);
  console.log(result)
  const numberOfDays = document.getElementById("Days")
  numberOfDays.innerHTML = result.days
  let store = []
  addOffencesButton.addEventListener("click", function (e) {
    e.preventDefault()

    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked').valueOf()

    //store offences
    for (let x of checkboxes) {
        let offence = {offence: x.value}
        store.push(offence)
    }


    //build new object
    let remandPeriod = {
      type: result.type,
      start: result.start,
      end: result.end,
      days: result.days,
      caseNo: result.caseNo,
      offences: store
    }

    adjustments.push(remandPeriod)
    localStorage.setItem('adjustments', JSON.stringify(adjustments))

    location.href = `review-2.html`;
  })


}
if(addDatesButton) {
  console.log("enter dates")
  addDatesButton.addEventListener("click", function (e) {
    e.preventDefault()

    //create date
    const from = createDate(fromDay, fromMonth, fromYear);
    const to = createDate(toDay, toMonth, toYear);
    //work out days
    const days = createDaysAdded(fromDay, fromMonth, fromYear, toDay, toMonth, toYear);

    //add dates to local storage
    addDates("Remand", from, to, days, adjustments.length + 1)

    console.log(adjustments)
    //go to next page
    location.href = `select-offences.html`;
  })
}


function createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
  let fromDate = new Date(fromYear.value + "-" + fromMonth.value + "-" + fromDay.value);
  let toDate = new Date(toYear.value + "-" + toMonth.value + "-" + toDay.value);

  return daysBetweenDates(fromDate, toDate)+1
}
function createDate (day, month, year) {
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
      monthName = 'Jun';
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
function daysBetweenDates (date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(timeDifference / oneDay);
  return days;
}
const addAnotherRadios = document.getElementsByClassName('add-another');

const fromDay = document.getElementById('from-day');
const fromMonth = document.getElementById('from-month');
const fromYear = document.getElementById('from-year');

const toDay = document.getElementById('to-day');
const toMonth = document.getElementById('to-month');
const toYear = document.getElementById('to-year');

const numberOfDays = document.getElementById('number-of-days');

function addDates(type, start, end, days, caseNo) {
  let newDates = {
    type: type,
    start: start,
    end: end,
    days: days,
    caseNo: caseNo
  }

  dates.push(newDates)
  localStorage.setItem('dates', JSON.stringify(dates))
  console.log(dates)
}

function getCheckedItem(list){
  let offences = [];
  for (let x of list) {
    if (x.checked){
      offences.push(x.value);
    }
    return offences
  }
}

