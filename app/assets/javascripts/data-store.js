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

console.log(offenceStartDay);
function createOffenceStartDate(day, month, year) {
  console.log(day)
  let date = `${day}-${month}-${year}`;
  console.log("s", date)
  return date
}


function createOffenceEndDate(day, month, year) {
  let date = `${day.value} - ${month.value} - ${year.value}`;
  return date
}
//add item to object

function addOffence(offence, on , to) {

  let offenceList = localStorage.getItem('offenceList');
  offenceList = offenceList ? JSON.parse(offenceList) : []
  let oo = {
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
    //location.href = 'check-your-answers.html';
  })
}
if (nameInput) {
  nameInputButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem('name', nameInput.value)
    console.log(localStorage.getItem('name'))
    console.log(localStorage.getItem('entries'));
    location.href = 'page-2.html';
  })
}

if(ageInput) {
  ageInputButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(localStorage.getItem('dataObject'));
    localStorage.setItem('age', ageInput.value);

    let ds = []
    let entry = {
      "name": localStorage.getItem('name'),
      "age": ageInput.value
    };
    ds.push(entry);
    console.log(entry)

    //addItem(ageInput.value);

    addEl(ageInput.value);

    //const newSet = Object.assign(localStorage.getItem('dataObject'), entry)

    //localStorage.setItem("dataObject", JSON.stringify(ds));

    location.href= 'result.html';
  })
}


function addItem(age) {
  const source = JSON.parse(localStorage.getItem('newData'));

  if(localStorage.getItem("newData") && localStorage.getItem("newData").length > 0) {
    let tt = [localStorage.getItem('newData')];
    console.log("here", tt)
    let dataObj = {
      name: "paul",
      age: age
    }
    let rr = [];
    tt.push(dataObj);
    //rr.push(dataObj)

    //source.push(dataObj);
    localStorage.setItem("newData", JSON.stringify(tt));
    //console.log(JSON.parse(localStorage.getItem('newData')));
  } else {
    let dataObj = {
      name: "paul",
      age: age
    }
    localStorage.setItem("newData", JSON.stringify(dataObj));
  }

  //console.log(arr)

}

function addEl(age) {

  let existing = localStorage.getItem('myLunch');
  existing = existing ? JSON.parse(existing) : []
  let oo = {
    name: localStorage.getItem('name'),
    age:age
  }
  arr = JSON.stringify(existing)
  existing.push(oo);
  localStorage.setItem('myLunch', JSON.stringify(existing))

  console.log(2, existing, localStorage.getItem('myLunch'))

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