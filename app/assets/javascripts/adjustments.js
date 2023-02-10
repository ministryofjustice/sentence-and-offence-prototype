const adjustmentTypeRadios = document.getElementsByClassName('adjustment-type')
const selectAdjustementButton = document.getElementById('select-adjustment-button')


function radioRoute(radios) {
  for(let x of radios) {
    if(x.checked) {
      let route = x.getAttribute("data-route")
      location.href = `${route}.html`;
    }
  }
}

selectAdjustementButton.addEventListener('click', function(e) {
  e.preventDefault()
  radioRoute(adjustmentTypeRadios);

})