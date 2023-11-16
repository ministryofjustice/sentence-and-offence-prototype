console.log("here")
//set up data

let adjustments = localStorage.getItem('adjustments');
adjustments = adjustments ? JSON.parse(adjustments) : [];

let dates = localStorage.getItem('dates');
dates = dates ? JSON.parse(dates) : [];

let TBcase = localStorage.getItem('TBcase');
TBcase = TBcase ? JSON.parse(TBcase) : [];
let selectedOffences = [];

let selectedRemandPeriodID = localStorage.getItem('SelectedRemandPeriod');
selectedRemandPeriodID = selectedRemandPeriodID ? JSON.parse(selectedRemandPeriodID) :0;

let activeJourney = localStorage.getItem('activeJourney');
activeJourney = activeJourney ? JSON.parse(activeJourney) :0;


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
const addTaggedBailDaysButton = document.getElementById("add-tagged-bail-days-button")
const saveTaggedBailButton = document.getElementById("saveTaggedBailButton")
const addCaseButton = document.getElementById("add-case-button")
const reviewButton = document.getElementById('review-remand-button')
const displayRemandContainer = document.getElementById('periodsOfRemand')

//add remand review page
if(reviewButton){
  let remandCount = document.getElementById('totalDays')
   let p=getTotalRemandDays("Remand", remandCount)

  //const result = adjustments.filter(({ type }) => type === "Remand");
  const result = filterAdjustmentsByType( "Remand");
  for(let x of result) {
    displayRemandPeriod(x,displayRemandContainer);
  }

  reviewButton.addEventListener('click', function(e){
    e.preventDefault()
    let radios = document.getElementsByClassName('govuk-radios__input');
    radioRoute(radios);
  })
}

function filterAdjustmentsByType(remandType){
  const result = adjustments.filter(({ type }) => type === remandType );
  return result
}

function filterAdjustmentsByID(id){
  const result = adjustments.filter(({ caseNo }) => caseNo === id );
  return result
}

function displayRemandPeriod(x, target){
  let html = `    <dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                               Remand period
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${x.start} to ${x.end}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="#">
                                    Edit<span class="govuk-visually-hidden"> Edit</span>
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
                                    Edit<span class="govuk-visually-hidden"> Edit</span>
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
    let row = `<li>${x.offence}<br><span class="govuk-hint">${x.date}</span></li>`
    html += row
  }
  return html
}
//index page

const AddNewTaggedBailLink =document.getElementById("AddNewTaggedBail")
let journey = "Home"
if(AddNewTaggedBailLink){
  addTaggedBailDaysButton.addEventListener("click", function(e){
    e.preventDefault()
    journey = "Tagged Bail"
    location.href = `select-case.html`
  })
}

//unused deductions
let unusedDeductions = document.getElementById("unusedDeductions");

if(unusedDeductions) {
  document.getElementById('unusedDeductions').innerHTML = totalDays
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

//add remand save page
let saveTable = document.getElementById('tableBody')
if(saveTable){
  console.log(totalDays)
  document.getElementById('saveTableTotal').innerHTML = totalDays
  if(totalDays >= 50) {
    let alert = `
<h2 class="govuk-heading-m">There are 18 days of unused remand</h2>
    <p class="">
      Unused remand will not be taken into the sentence calculation. The unused remand time can be carried over to future licence recall cases.
      </p>
     
      <p class="">You will need to add the unused remand alert on NOMIS.</p>
`

    document.getElementById("alerthere").innerHTML = alert
  }
function createTableRow(data){
  let html = ``
  for(let x of data){
    let row = `  <tr class="govuk-table__row">
                            <td scope="row" class="govuk-table__cell">${x.start} to ${x.end}</td>
                            <td class="govuk-table__cell">${x.days}</td>
                        </tr>`
    html += row
  }
  return html
}
  let html = `${createTableRow(adjustments)}`
  saveTable.innerHTML = html
}

//add remand select offences page
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
        let offence = {
          offence: x.value,
          court:x.getAttribute("data-court"),
          date:x.getAttribute("data-offence-date"),
        }
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


/////tagged bail

let selectCaseLinks = document.getElementsByClassName("select-case-link")

if(selectCaseLinks){
  Array.from(selectCaseLinks).forEach(function(selectedLink)
  {
    selectedLink.addEventListener('click', function (e) {
      e.preventDefault()

      let selectedCase = {
        court: selectedLink.getAttribute("data-court"),
        date: selectedLink.getAttribute("data-date"),
        ref: selectedLink.getAttribute("data-case")
      }
      console.log(selectedCase)
      TBcase.push(selectedCase)
      localStorage.setItem('TBcase', JSON.stringify(TBcase))
      location.href = `add-tagged-bail.html`;
    })
  })
}
if(addCaseButton) {
  let radios = document.getElementsByClassName("govuk-radios__input")


  addCaseButton.addEventListener("click", function (e){
    e.preventDefault()
    let selectedCase = {}
    for(let x of radios) {
      if(x.checked) {
        console.log(x.getAttribute("data-case"))
        let selectedCase ={
          court: x.value,
          date:x.getAttribute("data-date"),
          ref:x.getAttribute("data-case")
        }
        TBcase.push(selectedCase)
        localStorage.setItem('TBcase', JSON.stringify(TBcase))
      }
    }
    location.href = `add-tagged-bail.html`;
  })
}

if(addTaggedBailDaysButton) {
  console.log(TBcase)
  let tbc = adjustments.length-1;
  console.log(tbc,'8')
  const TBDays = document.getElementById("taggedBailDays")
  addTaggedBailDaysButton.addEventListener("click", function(e){
    e.preventDefault()


    let taggedBail = {
      caseNo: adjustments.length+1,
      type: "Tagged Bail",
      court:TBcase[0].court,
      date:TBcase[0].date,
      ref:TBcase[0].ref,
      days: parseInt(TBDays.value)
    }
    adjustments.push(taggedBail)
    localStorage.setItem('adjustments', JSON.stringify(adjustments))
    location.href = `review-tagged-bail.html`;
  })
}

//save tagged bail
if(saveTaggedBailButton){
  let activeId = adjustments.length
  //get record
  console.log(adjustments)
  const result = adjustments.find(({ caseNo }) => caseNo === activeId);
  let dataTarget = document.getElementById('ReviewTaggedBail')
 let html = `

<dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                               Case details
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${result.court} <br>
                               <span>${result.ref}</span>
                               <span>${result.date}</span>
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="select-case">
                                    Edit<span class="govuk-visually-hidden"> Edit</span>
                                </a>
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Days 
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${result.days}
                            </dd>
                            <dd class="govuk-summary-list__actions">
                                <a class="govuk-link" href="add-tagged-bail.html">
                                    Edit<span class="govuk-visually-hidden"> Edit</span>
                                </a>
                            </dd>
                        </div>
                    </dl>
`
  dataTarget.innerHTML = html
  saveTaggedBailButton.addEventListener('click', function(){
    let journey = saveTaggedBailButton.getAttribute('data-journey')
    localStorage.setItem('activeJourney', parseInt(journey))
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

///// index page


// if(indexPage) {
//   // RemandScreenCount = document.getElementById("RemandTotal");
//   // TaggedBailScreenCount = document.getElementById("TaggedBailTotal");
//   // console.log(adjustments)
//   // //get counts
//   // remandCount = getCount(RemandScreenCount)
//   // displayViewLink("remand", remandCount)
//   //displayViewLink("remand", TaggedBailScreenCount)
//   //if greater than 0 display view
// }
function getCount(element){
  let count = parseInt(element.innerHTML)
  return count;
}
function displayViewLink(adjustment, days) {
  if(days >= 1) {
    let adjustmentName = adjustment
    let element = "view-"+adjustmentName
    let target = document.getElementsByClassName(element)[0]
    //view-remand
    target.classList.remove('moj-hidden')
  }
}

//display tagged bail count on exit
const taggedBailCount = document.getElementById('TaggedBailTotal')
const RemandCount = document.getElementById('RemandTotal')
const RemandViewLink = document.getElementById('viewRemand')
const TaggedBailViewLink = document.getElementById('viewTaggedBail')
let indexPage = document.getElementById("indexPage")
let notificationContainer = document.getElementById("notificationContainer")
if(indexPage) {
  console.log(adjustments)
  console.log(activeJourney)
  displayAdjustmentTotals("Tagged Bail", taggedBailCount,TaggedBailViewLink)
  displayAdjustmentTotals("Remand", RemandCount,RemandViewLink)
  displayNotification(activeJourney, notificationContainer)
}


const TaggedBailList = document.getElementById('TaggedBailList');
if(TaggedBailList){
  //let target = document.getElementById('RemandPeriodListContainer')
  let editLinks = document.getElementsByClassName("edit-link")
  let deleteLinks = document.getElementsByClassName("delete-link")
  let taggedBailPeriods = filterAdjustmentsByType("Tagged Bail")
  let taggedBailPeriodCount = taggedBailPeriods.length
  let totalTaggedBailDays = 0

  for( let x of taggedBailPeriods){
    displayTaggedBailCard(x, TaggedBailList)
    totalTaggedBailDays += x.days;
  }

  selectItemByLink(deleteLinks, "delete-tagged-bail")
}

function displayTaggedBailCard(record, target){
  console.log(record);
  let html =`
    <div class="govuk-summary-card remand">
                        <div class="govuk-summary-card__title-wrapper ">
                            <h2 class="govuk-summary-card__title">${record.court}</h2>
                            <ul class="govuk-summary-card__actions">
                                <li class="govuk-summary-card__action"> <a id="remand${record.caseNo}" data-caseNo="${record.caseNo}" class="govuk-link edit-link" href="edit.html">
                                    Edit<span class="govuk-visually-hidden"> of University of Gloucestershire</span>
                                </a>
                                </li>
                                <li class="govuk-summary-card__action"> <a class="govuk-link delete-link" href="delete-tagged-bail.html" data-caseNo="${record.caseNo}">
                                    Delete<span class="govuk-visually-hidden"> from University of Gloucestershire</span>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <div class="govuk-summary-card__content">
                            <dl class="govuk-summary-list">
                                <div class="govuk-summary-list__row">
                                    <dt class="govuk-summary-list__key">
                                        Date
                                    </dt>
                                    <dd class="govuk-summary-list__value">
                                        ${record.date}
                                    </dd>
                                </div>
                                <div class="govuk-summary-list__row">
                                    <dt class="govuk-summary-list__key">
                                        Days
                                    </dt>
                                    <dd class="govuk-summary-list__value">
                                        ${record.days}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
  `
  target.innerHTML += html
}
function displayNotification(journey, container){
  const base = '';
  switch (journey) {
    case 1:
      container.innerHTML = `
   <div class="govuk-notification-banner govuk-notification-banner--success" role="alert"
                         aria-labelledby="govuk-notification-banner-title"
                         data-module="govuk-notification-banner">
      <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
               Remand updates have been saved
          </h3>
          <p class="govuk-body">Once all of the adjustments have been made, you must
              <a href="crd.html" class="govuk-notification-banner__link">recalculate release dates</a>.
          </p>
      </div>
  </div>
`
      break;
    case 2:
      container.innerHTML = `
   <div class="govuk-notification-banner govuk-notification-banner--success" role="alert"
                         aria-labelledby="govuk-notification-banner-title"
                         data-module="govuk-notification-banner">
      <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
              The remand record has been deleted
          </h3>
          <p class="govuk-body">You must
              <a href="crd.html" class="govuk-notification-banner__link">recalculate release dates</a>.
          </p>
      </div>
  </div>
`
      break;
    case 3:
      container.innerHTML = `
   <div class="govuk-notification-banner govuk-notification-banner--success" role="alert"
                         aria-labelledby="govuk-notification-banner-title"
                         data-module="govuk-notification-banner">
      <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
              Tagged bail updates have been saved
          </h3>
          <p class="govuk-body">Once all of the adjustments have been made, you must
              <a href="crd.html" class="govuk-notification-banner__link">recalculate release dates</a>.
          </p>
      </div>
  </div>
`
      break;
    case 4:
      container.innerHTML = `
   <div class="govuk-notification-banner govuk-notification-banner--success" role="alert"
                         aria-labelledby="govuk-notification-banner-title"
                         data-module="govuk-notification-banner">
      <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
              Tagged bail deleted
          </h3>
          <p class="govuk-body">You must
              <a href="crd.html" class="govuk-notification-banner__link">recalculate release dates</a>.
          </p>
      </div>
  </div>
`
      break;
    default:
      console.log(`Sorry, we are out of ${journey}.`);
  }

}
if(taggedBailCount){
  const result = adjustments.filter(({ type }) => type === "Tagged Bail");
  console.log(journey)

}

let saveRemandButton = document.getElementById('saveRemandButton')

if(saveRemandButton) {
  saveRemandButton.addEventListener('click', function(){
    let journey = saveRemandButton.getAttribute('data-journey')
    localStorage.setItem('activeJourney', parseInt(journey))
  })
}
function displayAdjustmentTotals(adjustment ,target, linkContainer){
  const result = adjustments.filter(({ type }) => type === adjustment);

  let total = 0
  if(result.length >= 0) {
    for (let x of result) {
      total += +x.days
    }
    console.log(total, adjustment)
    showViewLink(total,linkContainer )
    target.innerHTML = total
  } else {
    return 0
  }
}

function getTotalRemandDays(adjustment ,target){
  const result = adjustments.filter(({ type }) => type === adjustment);

  let total = 0
  if(result.length >= 0) {
    for (let x of result) {
      total += +x.days
    }
    console.log(total, adjustment)
    target.innerHTML = total
  } else {
    return 0
  }
}

function showViewLink(days, linkContainer){
  if(days >= 1){
    linkContainer.classList.remove('moj-hidden')
  }
}

const ViewRemandPage = document.getElementById('ViewRemandPage')

if(ViewRemandPage){
  console.log(adjustments)
  let screenRemandPeriods = document.getElementById("RemandPeriodsCount")
  let editLinks = document.getElementsByClassName("edit-link")
  let deleteLinks = document.getElementsByClassName("delete-link")
  let screenRemandCount = document.getElementById("TotalRemandDays")
  let target = document.getElementById('RemandPeriodListContainer')
  let remandPeriods = filterAdjustmentsByType("Remand")
  let remandPeriodCount = remandPeriods.length
  let totalRemandDays = 0

  for( let x of remandPeriods){
    displayRemandCard(x, target)
    totalRemandDays += x.days;
  }

  Array.from(editLinks).forEach(function(selectedLink) {
    selectedLink.addEventListener('click', function (e) {
      e.preventDefault()
      localStorage.setItem('SelectedRemandPeriod', selectedLink.getAttribute('data-caseNo'))
      //selectedRemandPeriodID = selectedLink.getAttribute('data-caseNo')
      location.href = `edit.html`;
    })
  })

  //combine these

  // Array.from(deleteLinks).forEach(function(selectedLink) {
  //   selectedLink.addEventListener('click', function (e) {
  //     e.preventDefault()
  //     localStorage.setItem('SelectedRemandPeriod', selectedLink.getAttribute('data-caseNo'))
  //     //selectedRemandPeriodID = selectedLink.getAttribute('data-caseNo')
  //     location.href = `delete.html`;
  //   })
  // })
  selectItemByLink(deleteLinks, "delete")
  selectItemByLink(editLinks, "edit")
  screenRemandPeriods.innerHTML = remandPeriodCount
  screenRemandCount.innerHTML = totalRemandDays



  //console.log(totalRemandDays, remandPeriodCount)
}

function selectItemByLink(links, page){
  Array.from(links).forEach(function(selectedLink) {
    selectedLink.addEventListener('click', function (e) {
      e.preventDefault()
      localStorage.setItem('SelectedRemandPeriod', selectedLink.getAttribute('data-caseNo'))
      //selectedRemandPeriodID = selectedLink.getAttribute('data-caseNo')
      location.href = page+`.html`;
    })
  })
}

function displayRemandCard(record, target){
  let html =`
    <div class="govuk-summary-card remand">
                        <div class="govuk-summary-card__title-wrapper ">
                            <h2 class="govuk-summary-card__title">From ${record.start} to ${record.end}</h2>
                            <ul class="govuk-summary-card__actions">
                                <li class="govuk-summary-card__action"> <a id="remand${record.caseNo}" data-caseNo="${record.caseNo}" class="govuk-link edit-link" href="edit.html">
                                    Edit<span class="govuk-visually-hidden"> of University of Gloucestershire</span>
                                </a>
                                </li>
                                <li class="govuk-summary-card__action"> <a class="govuk-link delete-link" href="delete.html" data-caseNo="${record.caseNo}">
                                    Delete<span class="govuk-visually-hidden"> from University of Gloucestershire</span>
                                </a>
                                </li>
                            </ul>
                        </div>
                        <div class="govuk-summary-card__content">
                            <dl class="govuk-summary-list">
                                <div class="govuk-summary-list__row">
                                    <dt class="govuk-summary-list__key">
                                        Court name
                                    </dt>
                                    <dd class="govuk-summary-list__value">
                                        ${record.offences[0].court}
                                    </dd>
                                </div>
                                <div class="govuk-summary-list__row">
                                    <dt class="govuk-summary-list__key">
                                        Offences
                                    </dt>
                                    <dd class="govuk-summary-list__value">
                                        <ul class="govuk-list">
                                             ${listOffences(record.offences)}
                                        </ul>
                                    </dd>
                                </div>
                                <div class="govuk-summary-list__row">
                                    <dt class="govuk-summary-list__key">
                                        Days
                                    </dt>
                                    <dd class="govuk-summary-list__value">
                                        ${record.days}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
  `
  target.innerHTML += html
}

//edit remand page
let editRemand = document.getElementById('EditRemandPage')
if(editRemand) {
  let date = document.getElementById('PeriodDate')
  let days = document.getElementById('PeriodDays')
  let offences = document.getElementById('OffenceLI')
  let period = filterAdjustmentsByID(selectedRemandPeriodID)

  date.innerHTML = `From ${period[0].start} to ${period[0].end}`
  days.innerHTML = `${period[0].days}`
  offences.innerHTML = `   <ul class="govuk-list">
                                    ${listOffences(period[0].offences)}
                                </ul>`
  console.log(period,'t')
}

//delete remand page
//delete record using caseNo
function deleteRecord(records, id){
  let updateAdjustments = records.filter((record) => record.caseNo !== id)
  updateAdjustmentsList(updateAdjustments)
}

function updateAdjustmentsList(newData){
  localStorage.setItem('adjustments', JSON.stringify(newData))
}


let deleteRemand = document.getElementById('DeleteRemandPage')
let DeleteTaggedBailPage = document.getElementById('DeleteTaggedBailPage')
if(deleteRemand) {
  // let screenRemandPeriods = document.getElementById("RemandPeriodsCount")
  // let screenRemandCount = document.getElementById("TotalRemandDays")
  let offences = document.getElementById("OffenceLI")

  let date = document.getElementById('PeriodDate')
  let deletebutton = document.getElementById('DeleteRemandPeriod')
  let days = document.getElementById('PeriodDays')
  let period = filterAdjustmentsByID(selectedRemandPeriodID)

  date.innerHTML = `From ${period[0].start} to ${period[0].end}`
  days.innerHTML = `${period[0].days}`
  offences.innerHTML = `   <ul class="govuk-list ">
                                    ${listOffences(period[0].offences)}
                                </ul>`

  deletebutton.addEventListener('click', function(e){
    e.preventDefault()
     deleteRecord(adjustments, selectedRemandPeriodID)
    let journey = deletebutton.getAttribute('data-journey')
    localStorage.setItem('activeJourney', parseInt(journey))
    location.href = `index-1.html`;
  })
}

if(DeleteTaggedBailPage) {

  let date = document.getElementById('PeriodDate')
  let deletebutton = document.getElementById('DeleteRemandPeriod')
  let days = document.getElementById('PeriodDays')
  let period = filterAdjustmentsByID(selectedRemandPeriodID)
  console.log(period)

  date.innerHTML = `${period[0].court} `
  days.innerHTML = `${period[0].days}`


  deletebutton.addEventListener('click', function(e){
    e.preventDefault()
    deleteRecord(adjustments, selectedRemandPeriodID)
    let journey = deletebutton.getAttribute('data-journey')
    localStorage.setItem('activeJourney', parseInt(journey))
    location.href = `index-1.html`;
  })
}

