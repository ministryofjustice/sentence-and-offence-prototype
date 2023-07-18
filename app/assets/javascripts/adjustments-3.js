document.addEventListener("load", function() {

  //let reviewDone = 0;
});
  let adjustments = localStorage.getItem('adjustments');
  adjustments = adjustments ? JSON.parse(adjustments) : [];

  let liveID = localStorage.getItem('liveID')

  const adjustmentTypeRadios = document.getElementsByClassName('adjustment-type');
  const rejectRemandOptions = document.getElementsByClassName('reject-remand-option');
  const addAnotherRadios = document.getElementsByClassName('add-another');
  const selectAdjustementButton = document.getElementById('select-adjustment-button');
  const hubPage = document.getElementById('hubPage');
  const addAdjustmentButton = document.getElementById('add-adjustment-button');
  const acceptButton = document.getElementById('accept-button');
  const adjustmentsExplainer = document.getElementById('adjustmentsExplainer');
  const remandToolButton = document.getElementById('remand-button');
  const rejectRemandToolButton = document.getElementById('reject-remand-button');
  const review = document.getElementById('review');
  const ualPage = document.getElementById('UALPage');


  //backlinks
  const backLink = document.getElementById('backLink');
  const adjustmentsList = document.getElementById('adjustmentsList');

  const fromDay = document.getElementById('from-day');
  const fromMonth = document.getElementById('from-month');
  const fromYear = document.getElementById('from-year');

  const toDay = document.getElementById('to-day');
  const toMonth = document.getElementById('to-month');
  const toYear = document.getElementById('to-year');
  const documentID = document.getElementById('document-ID');

  const numberOfDays = document.getElementById('number-of-days');
  const checkboxes = document.querySelectorAll('.ada-days-input');

//rada inputs

  const radaDay = document.getElementById('rada-day');
  const radaMonth = document.getElementById('rada-month');
  const radaYear = document.getElementById('rada-year');
  const radaNumberOfDays = document.getElementById('rada-number-of-days');
  const radaDocID = document.getElementById('rada-document-ID');

//pages

const enterRadaDetails = document.getElementById('Enter-Rada-Details')
const checkYourAnswersPage = document.getElementById('CheckYourAnswersPage')

//buttons
const enterRadaDetailsButton = document.getElementById('Enter-rada-detail-button')

if(checkYourAnswersPage) {
  const heading = document.getElementById('DataTitle')
  let target = document.getElementById('Details')
  console.log(parseInt(liveID), 'f');

  let data =  adjustments.filter((x) => x.id === parseInt(liveID));
  console.log(data)
  let type = data[0].type
  switch (type) {
    case "UAL":
      let html = `<dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                First day spent unlawfully at large
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${data[0].from}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Last day spent unlawfully at large
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${data[0].to}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Number of days
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${data[0].days}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Type of UAL
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${data[0].ualType}
                            </dd>
                        </div>
                    </dl>`
      Details.innerHTML = html
      heading.innerHTML = "UAL details"
      break;
    case "RADA":
      let radahtml = `<dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Date days were restored
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${data[0].from}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Number of days
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${data[0].days}
                            </dd>
                        </div>
                    </dl>`
      Details.innerHTML = radahtml
      heading.innerHTML = "Rada details"
      break;
    case "REMAND":

      break;
    case "ADA":

      break;
    default:

      break;
  }
}

//Rada
// if(enterRadaDetails) {
//   console.log('working')
//
//   enterRadaDetailsButton.addEventListener('click', function(e){
//     let from = createDate(radaDay,radaMonth,radaYear)
//     let days = radaNumberOfDays.value
//     let id = adjustments.length +1
//     let desc = null
//     addAdjustment ("RADA", from, null, days, id, desc)
//
//   })
// }
const addUALButton = document.getElementById('add-ual-button');
  let reviewDone = 0;


  if(backLink) {
    backLink.addEventListener("click", function(e) {
      e.preventDefault();
      window.history.back();
    });
  }
  function radioRoute (radios) {
    for (let x of radios) {
      if (x.checked) {
        let route = x.getAttribute("data-route")
        location.href = `${route}.html`;
      }
    }
  }
// Get all the checkboxes


// Add event listener to each checkbox
  if(checkboxes) {

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        calculateTotal();
      });
    });
  }
// Calculate the total balance
function calculateTotal() {
  let cb1 = document.getElementById('1234567');
  let cb2 = document.getElementById('3456789');
  let total = 0;

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let cc = checkbox.getAttribute('data-cc')
      if (cc ==='consec'){
        return 0
      }else {
        var balance = parseInt(checkbox.getAttribute('data-days-balance'));
        total += balance;
      }
    }
    if(cb1.checked && cb2.checked){
      total = 42
    }
  });

  // Update the total balance in the HTML
  document.getElementById('totalBalance').textContent = total;
}

function addAdjustmentData (type, from, to, days, id, desc, ualType, fromDay, toDay, fromMonth, toMonth, fromYear, toYear) {
  // let storedAdjustments = localStorage.getItem('storedAdjustments');
  // storedAdjustments = storedAdjustments ? JSON.parse(storedAdjustments) : []

  let newAdjustment = {
    type: type,
    from: from,
    to: to,
    days: days,
    id: id,
    desc: desc,
    ualType: ualType,
    fromDay: fromDay,
    toDay: toDay,
    fromMonth: fromMonth,
    toMonth: toMonth,
    fromYear: fromYear,
    toYear: toYear
  }

  adjustments.push(newAdjustment)
  localStorage.setItem('adjustments', JSON.stringify(adjustments))
  console.log(adjustments)
}
  function addAdjustment (type, from, to, days, id, desc) {
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

  if (selectAdjustementButton) {
    selectAdjustementButton.addEventListener('click', function (e) {
      e.preventDefault()
      radioRoute(adjustmentTypeRadios);

    })
  }

if (rejectRemandToolButton) {
  rejectRemandToolButton.addEventListener('click', function (e) {
    e.preventDefault()
    radioRoute(rejectRemandOptions);

  })
}

  if (remandToolButton) {
    remandToolButton.addEventListener('click', function (e) {
      e.preventDefault()
      addAdjustment('REMAND', '1 Feb 2018', '17 Feb 2018', 11, null, 'Remand')
      reviewDone = 1;
      location.href = 'check-your-answers.html';
    })
  }

  function createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
    let fromDate = new Date(fromYear.value + "-" + fromMonth.value + "-" + fromDay.value);
    let toDate = new Date(toYear.value + "-" + toMonth.value + "-" + toDay.value);

    return daysBetweenDates(fromDate, toDate)
  }

  if (addAdjustmentButton) {
    console.log(adjustments)
    let type = addAdjustmentButton.getAttribute("data-name")
    let desc = addAdjustmentButton.getAttribute("data-desc")
    let id;
    let to;
    let days;
    let from;
    let description;

    addAdjustmentButton.addEventListener('click', function (e) {
      e.preventDefault()
      switch (type) {
        case "UAL":
          const radios = document.getElementsByClassName("govuk-radios__input")
          let UALType = getCheckedItem(radios)
          from = createDate(fromDay, fromMonth, fromYear);
          to = createDate(toDay, toMonth, toYear);
          days = createDaysAdded(fromDay, fromMonth, fromYear, toDay, toMonth, toYear);
          id = adjustments.length+1;
          description = desc;
          addAdjustmentData(type, from, to, days, id, description, UALType, fromDay.value, toDay.value, fromMonth.value, toMonth.value, fromYear.value, toYear.value );
          localStorage.setItem('liveID', id)
          break;
        case "RADA":
          from = createDate(radaDay, radaMonth, radaYear);
          to = null;
          days = parseInt(radaNumberOfDays.value);
          id = adjustments.length +1;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
          localStorage.setItem('liveID', id)
          break;
        case "REMAND":
          from = createDate(fromDay, fromMonth, fromYear);
          to = createDate(toDay, toMonth, toYear);
          days = createDaysAdded(fromDay, fromMonth, fromYear, toDay, toMonth, toYear);
          id = null;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
          break;
        case "ADA":
          from = createDate(fromDay, fromMonth, fromYear);
          to = null
          days = parseInt(numberOfDays.value);
          id = documentID.value;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
          break;
        default:
          from = createDate(fromDay, fromMonth, fromYear);
          to = null;
          days = parseInt(numberOfDays.value);
          id = documentID.value;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
          break;
      }
      location.href = 'check-your-answers.html'

    })
  }

  if (acceptButton) {
    acceptButton.addEventListener('click', function (e) {
      e.preventDefault();
      radioRoute(addAnotherRadios)
    })
  }

  function displayCaseData (p) {
    let adjustment;
    switch (p.type) {
      case 'UAL':
        adjustment = `<div class="sentence-block">
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
               </div>`;
        adjustmentsList.innerHTML += adjustment
        break;
      case 'REMAND':
        adjustment = `<div class="sentence-block">
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
                       Remand started
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
                          Remand ended
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
               </div>`;
        adjustmentsList.innerHTML += adjustment
        break;
      case 'RADA':
        adjustment = `<div class="sentence-block">
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
                
                  </div>`
        adjustmentsList.innerHTML += adjustment;
        break;
      default:
        adjustment = `<div class="sentence-block">
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
                  </div>`
        adjustmentsList.innerHTML += adjustment;
    }
  }

  function daysBetweenDates (date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor(timeDifference / oneDay);
    return days;
  }

  if (adjustmentsList) {
    let total = 0
    let data = adjustments;

    for (let x of data) {
      displayCaseData(x)
      let counted = total + parseInt(x.days)
      total = counted
    }
    let explainer = `<div class="govuk-inset-text"><p class="govuk-label--m"> Based on the information entered Joe Bloggs has ${total} days of adjustments.</p></div>`
    adjustmentsExplainer.innerHTML += explainer
    console.log(total)

  }
let totals = [];
  function updateTotals (adj) {
    let days = 0;

    adjustments.forEach((e) => {
      if (e.type === adj) {
        days += +e.days
        totals.push({days:e.days, type:adj})
        //console.log(totals)
      }
    })
    //console.log(totals,'ggg')
    return days
  }

function groupDaysAndSumByType(arr) {
  const result = {};
  arr.forEach(obj => {
    const { days, type } = obj;
    if (type in result) {
      result[type] += days;
    } else {
      result[type] = days;
    }
  });

  return result;
}
function displayGroupedDaysAndSum(groupedDaysAndSum) {
  const divElement = document.getElementById("added");

  // Create a table element
  const tableElement = document.createElement("table");
  tableElement.classList.add('govuk-table')
  // Create a table row for the table header
  const headerRow = document.createElement("tr");
  headerRow.classList.add('govuk-table__cell')
  const typeHeader = document.createElement("th");
  typeHeader.textContent = "Adjustment type";
  const totalDaysHeader = document.createElement("th");
  totalDaysHeader.textContent = "Days";
  headerRow.appendChild(typeHeader);
  headerRow.appendChild(totalDaysHeader);
  tableElement.appendChild(headerRow);

  // Loop through the groupedDaysAndSum object and create a table row for each type and total days
  for (const type in groupedDaysAndSum) {
    const totalDays = groupedDaysAndSum[type];
    const row = document.createElement("tr");
    row.classList.add('govuk-table__row')
    const typeCell = document.createElement("td");
    typeCell.classList.add('govuk-table__cell')
    typeCell.textContent = type;
    const totalDaysCell = document.createElement("td");
    totalDaysCell.classList.add('govuk-table__cell')
    totalDaysCell.textContent = totalDays;
    row.appendChild(typeCell);
    row.appendChild(totalDaysCell);
    tableElement.appendChild(row);
  }

  // Append the table to the div
  divElement.appendChild(tableElement);
}



if (reviewDone == 1) {
  review.style.display = 'none'
}
  if (hubPage) {
    console.log(reviewDone)

    let total = 0
    let data = adjustments;
    for (let x of data) {
      if (x.days > 0) {
        let counted = total + parseInt(x.days)
        total = counted
      }
    }
    let resultCount = document.getElementById('count')
    if (resultCount) {
      resultCount.innerHTML += total
    }
    const hubCounts = document.getElementsByClassName('count')
    console.log(hubCounts)
    for (let x of hubCounts) {
      x.innerHTML = updateTotals(x.getAttribute('Id'))
    }

    const groupedDaysAndSum = groupDaysAndSumByType(totals);
   // displayGroupedDaysAndSum(groupedDaysAndSum);
    console.log(groupedDaysAndSum, "totals");
  }

function addUAL (type, from, to, days, id, desc, ualType, fromDay, toDay, fromMonth, toMonth, fromYear, toYear) {
  // let storedAdjustments = localStorage.getItem('storedAdjustments');
  // storedAdjustments = storedAdjustments ? JSON.parse(storedAdjustments) : []

  let newAdjustment = {
    type: type,
    from: from,
    to: to,
    days: days,
    id: id,
    desc: desc,
    ualType: ualType,
    fromDay: fromDay,
    toDay: toDay,
    fromMonth: fromMonth,
    toMonth: toMonth,
    fromYear: fromYear,
    toYear: toYear
  }

  adjustments.push(newAdjustment)
  localStorage.setItem('adjustments', JSON.stringify(adjustments))
  console.log(adjustments)
}
const radios = document.getElementsByClassName("govuk-radios__input")
function createOffenceEndDate(day, month, year) {
  let date = `${day.value}-${month.value}-${year.value}`;
  return date
}



function getCheckedItem(list){
  for (let x of list) {
    if (x.checked){
      return x.value;
    }
  }
}
  if(ualPage) {


    toYear.addEventListener("blur", function() {
      let days = createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear)
      numberOfDays.value= days
    })

    // addUALButton.addEventListener('click', function(e) {
    //
    // const radios = document.getElementsByClassName("govuk-radios__input")
    //   let id = adjustments.length +1
    //   let UALType = getCheckedItem(radios)
    //   let days = createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear)
    //   let from = createDate(fromDay, fromMonth, fromYear);
    //   let to = createDate(toDay, toMonth, toYear);
    //   let desc = "description";
    //   addUAL("UAL", from, to, days, id, desc, UALType, fromDay.value, toDay.value, fromMonth.value, toMonth.value, fromYear.value, toYear.value )
    //   localStorage.setItem('liveID', adjustments.length)
    //   console.log('clicked', adjustments, liveID )
    // })
  }

  const CheckUAL = document.getElementById("CheckUAL")

  if(CheckUAL) {

    console.log(liveID, adjustments)
   let UALdata =  adjustments.filter((x) => x.id === parseInt(liveID));

   let uals = adjustments.filter((x) => x.type === "UAL");
    console.log(adjustments, liveID, UALdata,uals)
    let html = ` <dl class="govuk-summary-list govuk-!-margin-bottom-9">
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Type of UAL
                            </dt>
                            <dd class="govuk-summary-list__value">
                                ${UALdata[0].ualType}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
            First day spent unlawfully at large                            
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${UALdata[0].from}
                            </dd>
                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
Last day spent unlawfully at large                            
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${UALdata[0].to}
                            </dd>

                        </div>
                        <div class="govuk-summary-list__row">
                            <dt class="govuk-summary-list__key">
                                Number of days
                            </dt>
                            <dd class="govuk-summary-list__value">
                               ${UALdata[0].days}
                            </dd>


                        </div>
                    </dl>`
    CheckUAL.innerHTML = html;
  }

const viewUAL = document.getElementById("viewUAL")
function addRow( adjustmentType, table,  ualType, from, to, enteredBy, days, actions){
  switch (adjustmentType) {
    case "UAL":
      var tableRow = table;
      var row = tableRow.insertRow(-1);
      row.classList.add('govuk-table__row');
      var cell1 = row.insertCell(0);
      cell1.classList.add("govuk-table__cell");
      var cell2 = row.insertCell(1);
      cell2.classList.add("govuk-table__cell");
      var cell3 = row.insertCell(2);
      cell3.classList.add("govuk-table__cell");
      var cell4 = row.insertCell(3);
      cell4.classList.add("govuk-table__cell");
      var cell5 = row.insertCell(4);
      cell5.classList.add("govuk-table__cell", "govuk-!-text-align-centre");
      var cell6 = row.insertCell(5);
      cell6.classList.add("govuk-table__cell");
      cell1.innerHTML = `${from}`;
      cell2.innerHTML = `${to}`;
      cell3.innerHTML = `${enteredBy}`;
      cell4.innerHTML = `${ualType}`;
      cell5.innerHTML = `${days}`;
      cell6.innerHTML = actions
      break;

    case "RADA":
      var tableRow = table;
      var row = tableRow.insertRow(-1);
      row.classList.add('govuk-table__row');
      var cell1 = row.insertCell(0);
      cell1.classList.add("govuk-table__cell");
      var cell2 = row.insertCell(1);
      cell2.classList.add("govuk-table__cell" , "govuk-!-text-align-centre");
      var cell3 = row.insertCell(2);
      cell3.classList.add("govuk-table__cell" , "govuk-!-text-align-centre");
      var cell4 = row.insertCell(3);
      cell4.classList.add("govuk-table__cell" , "govuk-!-text-align-centre");
      cell1.innerHTML = `${from}`;
      cell2.innerHTML = `${enteredBy}`;
      cell3.innerHTML = `${days}`;
      cell4.innerHTML = actions;
      break;
    default:
      break;
  }
}

  const viewAdjustmentData = document.getElementById('ViewAdjustment');

  if (viewAdjustmentData) {
    let totaldays = 0;
    console.log(adjustments)
    let data =  adjustments.filter((x) => x.type === "RADA");
    for ( let x of data) {
      let actions = `  <ul class="govuk-list">
                                 <li><a id="ItemEdit" href="edit-ual.html" class="govuk-link" data-liveID="${x.id}">Edit</a></li>
                                 <li><a id="ItemRemove" data-liveID="${x.id}" href="remove-ual-1.html" class="govuk-link removelink">Remove</a></li>
                           </ul>`;
      totaldays += parseInt(x.days)
      addRow("RADA",viewAdjustmentData, x.ualType,x.from, x.to,"Belmarsh prison", x.days, actions);
      let footer = viewAdjustmentData.createTFoot();
      footer.innerHTML =  `
                       <tr class="govuk-table__row">
                          <td class="govuk-table__cell govuk-table__header govuk-!-text-align-right" colspan="2">Total days</td>
                          <td colspan="1" id="TotalDays" class="govuk-table__cell govuk-table__header govuk-!-text-align-centre">${totaldays}</td>
                          <td class="govuk-table__cell"></td>
                       </tr>`
    }
  }
let totaldays = 0;
if(viewUAL){
  let uals = adjustments.filter((x) => x.type === "UAL");
  for ( let x of uals) {
    let actions = `  <ul class="govuk-list">
                                 <li><a id="ItemEdit" href="edit-ual.html" class="govuk-link edit-link" data-liveID="${x.id}">Edit</a></li>
                                 <li><a id="ItemRemove" data-liveID="${x.id}" href="remove-ual-1.html" class="govuk-link removelink">Remove</a></li>
                           </ul>`;
    totaldays += parseInt(x.days)
    addRow("UAL",viewUAL,  x.ualType,x.from, x.to,"Manchester Prison", x.days, actions);
  }
  let footer = viewUAL.createTFoot();
  footer.innerHTML =  `
                       <tr class="govuk-table__row">
                          <td class="govuk-table__cell govuk-table__header govuk-!-text-align-right" colspan="4">Total days</td>
                          <td colspan="1" id="TotalDays" class="govuk-table__cell govuk-table__header govuk-!-text-align-centre">${totaldays}</td>
                          <td class="govuk-table__cell"></td>
                       </tr>`


  const table = document.getElementById("viewUAL")

  const removeItem = document.getElementsByClassName('removelink')
  const editItem = document.getElementsByClassName('edit-link')

  Array.from(removeItem).forEach(function(element){
    element.addEventListener("click", function(e) {
      const attID = element.getAttribute("data-liveID")
      localStorage.setItem('liveID', attID)

    })
  })

  Array.from(editItem).forEach(function(element){
    element.addEventListener("click", function(e) {
      const attID = element.getAttribute("data-liveID")
      localStorage.setItem('liveID', attID)

    })
  })

}

const removeUAL = document.getElementById("RemoveUAL")
const editUAL = document.getElementById("EditUALPage")


if(editUAL){
  console.log(liveID)
  const editUALButton = document.getElementById("EditUAlButton")
  let item = JSON.parse(localStorage.getItem('liveID'))

  let record = adjustments.filter((x) => x.id === item);
  let radios = document.getElementsByClassName('govuk-radios__input')
  let days = 0;
  for(let x of radios){
    if (x.value === record[0].ualType) {
      x.checked = true
    }
  }
  console.log(record[0])

  fromDay.value = record[0].fromDay;
  toDay.value = record[0].toDay;
  fromMonth.value = record[0].fromMonth;
  toMonth.value = record[0].toMonth;
  fromYear.value = record[0].fromYear;
  toYear.value = record[0].toYear;
  numberOfDays.value = record[0].days;


  toYear.addEventListener("blur", function() {
    let days = createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear)
    numberOfDays.value= days
  })
  editUALButton.addEventListener('click', function(e){
    //e.preventDefault();
    console.log(item)
    for(let x of adjustments){
      if(x.id === item){
        console.log(x)
          x.from = createDate(fromDay, fromMonth, fromYear);
          x.to = createDate(toDay, toMonth, toYear);
          x.days = numberOfDays.value;
          x.ualType = getCheckedItem(radios);
          x.fromDay = fromDay.value;
          x.toDay = toDay.value;
          x.fromMonth =  fromMonth.value;
          x.toMonth =  toMonth.value;
          x.fromYear=  fromYear.value;
          x.toYear=  toYear.value;
      }
    }
    console.log(adjustments)

    localStorage.setItem('adjustments', JSON.stringify(adjustments))
  })
  console.log(adjustments)

}

if (removeUAL) {
  console.log("here")
  removeUAL.addEventListener('click', function(e){
    //e.preventDefault()
    console.log(adjustments[0].id,liveID)
    const revisedAdjustments = adjustments.filter(adjustment => {
      return adjustment.id !== parseInt(liveID)
    })
    console.log(revisedAdjustments,"yy")
    localStorage.setItem('adjustments', JSON.stringify(revisedAdjustments))
    console.log(adjustments, localStorage.getItem('adjustments'),"ff")
  })
}






