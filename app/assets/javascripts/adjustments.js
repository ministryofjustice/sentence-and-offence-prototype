let adjustments = localStorage.getItem('adjustments');
adjustments = adjustments ? JSON.parse(adjustments) : [];


const adjustmentTypeRadios = document.getElementsByClassName('adjustment-type');
const addAnotherRadios = document.getElementsByClassName('add-another');
const selectAdjustementButton = document.getElementById('select-adjustment-button');
const hubPage = document.getElementById('hubPage');
const addAdjustmentButton = document.getElementById('add-adjustment-button');
const acceptButton = document.getElementById('accept-button');
const adjustmentsExplainer = document.getElementById('adjustmentsExplainer');
const remandToolButton = document.getElementById('remand-button');

const adjustmentsList = document.getElementById('adjustmentsList');

const fromDay = document.getElementById('from-day');
const fromMonth = document.getElementById('from-month');
const fromYear = document.getElementById('from-year');

const toDay = document.getElementById('to-day');
const toMonth = document.getElementById('to-month');
const toYear = document.getElementById('to-year');
const documentID = document.getElementById('document-ID');

const numberOfDays = document.getElementById('number-of-days');

//rada inputs

const radaDay = document.getElementById('rada-day');
const radaMonth = document.getElementById('rada-month');
const radaYear = document.getElementById('rada-year');
const radaNumberOfDays = document.getElementById('rada-number-of-days');
const radaDocID = document.getElementById('rada-document-ID');


function radioRoute(radios) {
  for(let x of radios) {
    if(x.checked) {
      let route = x.getAttribute("data-route")
      location.href = `${route}.html`;
    }
  }
}

function addAdjustment(type, from, to, days, id, desc){
  // let storedAdjustments = localStorage.getItem('storedAdjustments');
  // storedAdjustments = storedAdjustments ? JSON.parse(storedAdjustments) : []

  let newAdjustment = {
    type: type,
    from: from,
    to: to,
    days: days,
    id: id,
    desc: desc
  }

  adjustments.push(newAdjustment)
  localStorage.setItem('adjustments', JSON.stringify(adjustments))
  console.log(adjustments)
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
if(selectAdjustementButton) {
  selectAdjustementButton.addEventListener('click', function (e) {
    e.preventDefault()
    radioRoute(adjustmentTypeRadios);

  })
}

if(remandToolButton) {
  remandToolButton.addEventListener('click',function(e){
    e.preventDefault()
    console.log('clicked')
    addAdjustment('Remand', '1 Feb 2018', '17 Feb 2018', 11,  null,'Remand')
    location.href = 'hub-9-a.html'
  })
}

if(addAdjustmentButton) {
console.log(adjustments)
  addAdjustmentButton.addEventListener('click', function(e){
    e.preventDefault()
    let type = addAdjustmentButton.getAttribute("data-name")
    let desc = addAdjustmentButton.getAttribute("data-desc")


    if(type === "UAL"){
      let fromDate = new Date(fromYear.value+"-"+fromMonth.value+"-"+fromDay.value);
      let toDate = new Date (toYear.value+"-"+toMonth.value+"-"+toDay.value);
      console.log(fromDate)
      let from = createDate(fromDay, fromMonth, fromYear);
      let to = createDate(toDay, toMonth, toYear);
      let days = daysBetweenDates(fromDate, toDate)
      let id = null
      let description = desc
      addAdjustment( type, from, to, days, id, description)
    } else if(type === "RADA") {
      let from = createDate(radaDay, radaMonth, radaYear);
      let to = null;
      let days = parseInt(radaNumberOfDays.value)
      let id = null
      let description = desc
      addAdjustment( type, from, to, days, id, description)
    } else {
      let from = createDate(fromDay, fromMonth, fromYear);
      let to = null;
      let days = parseInt(numberOfDays.value)
      let id = documentID.value
      let description = desc
      addAdjustment( type, from, to, days, id, description)
    }

    console.log(adjustments)
    location.href = 'check-your-answers.html'

  })
}


if(acceptButton) {
  acceptButton.addEventListener('click', function(e){
    e.preventDefault();
    radioRoute(addAnotherRadios)
  })
}
function displayCaseData(p){
  if (p.type === 'UAL') {
    let court = `
<div class="sentence-block">
 <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Adjustment type
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.desc}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
    <div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                       Unlawfully at large from
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${p.from}
                    </dd>
                    <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href="warrant-details.html">
                            Change<span class="govuk-visually-hidden"> date</span>
                        </a>
                    </dd>
                </div>
                <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Unlawfully at large to
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.to}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                   <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Number of days
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.days}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
               </div>
                 `
    adjustmentsList.innerHTML += court;

  } else if (p.type === 'RADA') {
    let court = `
<div class="sentence-block">
<div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                        Adjustment type
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${p.desc}
                    </dd>
                    <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href="warrant-details.html">
                            Change<span class="govuk-visually-hidden"> date</span>
                        </a>
                    </dd>
                </div>
                <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Date of days restored 
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.from}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Number of days
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.days}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                
                  </div>
                 `
    adjustmentsList.innerHTML += court;
  } else {
    let court = `
<div class="sentence-block">
<div class="govuk-summary-list__row">
                    <dt class="govuk-summary-list__key">
                        Adjustment type
                    </dt>
                    <dd class="govuk-summary-list__value">
                        ${p.desc}
                    </dd>
                    <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href="warrant-details.html">
                            Change<span class="govuk-visually-hidden"> date</span>
                        </a>
                    </dd>
                </div>
                <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Adjudication hearing date
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.from}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Number of days
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.days}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                    <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">
                          Adjudication ID
                      </dt>
                      <dd class="govuk-summary-list__value">
                          ${p.id}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                          <a class="govuk-link" href="warrant-details.html">
                              Change<span class="govuk-visually-hidden"> date</span>
                          </a>
                      </dd>
                  </div>
                  </div>
                 `
    adjustmentsList.innerHTML += court;
  }
}

function daysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(timeDifference / oneDay);
  return days;
}



if(adjustmentsList){
  let total = 0
  let data = adjustments;

  for(let x of data) {
    displayCaseData(x)
    let counted = total + parseInt(x.days)
    total = counted
  }
  let explainer = `<div class="govuk-inset-text"><p class="govuk-label--m"> Based on the information entered Joe Bloggs has ${total} days of adjustments.</p></div>`
  adjustmentsExplainer.innerHTML += explainer
  console.log(total)

}

function updateTotals(adj){
  let days = 0;
  adjustments.forEach((e) => {
    if (e.type === adj) {
      days += +e.days
    }
  })
  return days
}

if (hubPage) {
  let total = 0
  let data = adjustments;
console.log(data)
  for(let x of data) {
    if(x.days > 0) {
      let counted = total + parseInt(x.days)
      total = counted
    }
  }
let resultCount =  document.getElementById('count')
  if (resultCount) {

    resultCount.innerHTML += total
    console.log(total)
  }
  const hubCounts = document.getElementsByClassName('count')
  for(let x of hubCounts) {
    x.innerHTML = updateTotals(x.getAttribute('ID'))
  }
}

const remandCount = document.getElementById('Remand')

if(remandCount.innerHTML > 0 ) {
  console.log(remandCount.innerHTML)
}