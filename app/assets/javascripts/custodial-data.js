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
const thisOffenceContainer = document.getElementById("this-sentence-detail")
if (thisOffenceContainer) {
  const dataDump = localStorage.getItem("offence")
  const data = JSON.parse(dataDump)
  console.log(data)

  // for (let x of data) {
  //   if (x.offence.outcome === "Guilty") {
      let details = `<p>Add sentence details for the following offence</p>
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
// const y = JSON.stringify(courts);
// console.log(courts);
// cd = document.getElementById("cd")
// for(let x of courts) {
//   console.log(x)
//   let p = `<option value=${x.Court}>${x.Court}</option>`
//   document.write(p)
//   cd.innerHTML += p
// }