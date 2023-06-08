document.addEventListener("load", function() {

  //let reviewDone = 0;
});
  let adjustments = localStorage.getItem('adjustments');
  adjustments = adjustments ? JSON.parse(adjustments) : [];

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


  //bacllinks
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
  });

  // Update the total balance in the HTML
  document.getElementById('totalBalance').textContent = total;
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
          from = createDate(fromDay, fromMonth, fromYear);
          to = createDate(toDay, toMonth, toYear);
          days = createDaysAdded(fromDay, fromMonth, fromYear, toDay, toMonth, toYear);
          id = null;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
          break;
        case "RADA":
          from = createDate(radaDay, radaMonth, radaYear);
          to = null;
          days = parseInt(radaNumberOfDays.value);
          id = null;
          description = desc;
          addAdjustment(type, from, to, days, id, description);
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
    displayGroupedDaysAndSum(groupedDaysAndSum);
    console.log(groupedDaysAndSum, "totals");
  }
  if(ualPage) {

    toYear.addEventListener("blur", function() {
      let days = createDaysAdded (fromDay, fromMonth, fromYear, toDay, toMonth, toYear)
      numberOfDays.value= days
    })
  }



