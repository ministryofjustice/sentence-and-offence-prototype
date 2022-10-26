const page = document.getElementsByClassName('cc')[0];

if (page) {
  const pageButton = document.getElementById('add-sentence-button2');
  const caseList = document.getElementById('cases');
  const ccInput = Array.from(document.getElementsByClassName('cc-input'));
  const cases = Array.from(document.getElementsByClassName('case-option'));
  const offences = Array.from(document.getElementsByClassName('offence-option'));
  //const ccValue = document.querySelector('input[name="cc-value"]:checked').value;

  function getDropdownValue(option){
    const optionValue = option.length && option.find(c => c.selected).value;
    return optionValue
  }

  function getRadioValue(option){
    const optionValue = option.length && option.find(c => c.checked).value;
    return optionValue
  }

  pageButton.addEventListener("click", function (e){
    e.preventDefault();
   //const caseNumber = cases.length && cases.find(c => c.selected).value;
    const offence = getDropdownValue(offences)
    const caseNumber = getDropdownValue(cases)
    const cc = getRadioValue(ccInput)
    console.log(cc, caseNumber, offence);
  })
}