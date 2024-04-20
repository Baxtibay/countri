const elButton = document.querySelector('.site-header__dark-mode-button')
// ul element index-countries-list
const elCountriesList = document.querySelector('.countries__list');
// search input element
const elSearchInput = document.querySelector('.filters__search-input');
// Select
const filterByRegion = document.querySelector('.filters__region-select')
// loader
const loader = document.querySelector('.loader-wrapper')
// not-found
const notFound = document.querySelector('.not-found')

// universal show content function
function showContent(content) {
  content.classList.add('show')
}

// universal hide content function
function hideContent(content) {
  content.classList.remove('show')
}

// DARK MODE FUNCTION
if(elButton) {
  elButton.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark-mode')
  })
}
// get data function
function generateHtml(data) {
  data.forEach(country => {
    const countryItem = document.createElement('li')
    countryItem.classList.add('countries__item')
    countryItem.innerHTML = `
    <a class="country__card" href="/country-page.html?name=${country.name.common}">
      <img class="country__flag-img" src="${country.flags.svg}" alt="${country.flags.alt}" width="264" height="160">
      <div class="country__about">
        <h3 class="country__name">${country.name.common}</h3>
        <dl class="country__details">
          <div class="country__details-item">
            <dt class="country__definition-title">Population:</dt>
            <dd class="country__definition-description">${
              country.population.toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            )}</dd>
          </div>
          <div class="country__details-item">
            <dt class="country__definition-title">Region:</dt>
            <dd class="country__definition-description regionName">${country.region}</dd>
          </div>
          <div class="country__details-item">
            <dt class="country__definition-title">Capital:</dt>
            <dd class="country__definition-description">${country.capital}</dd>
          </div>
          </dl>
        </div>
      </a>
    `
    elCountriesList.appendChild(countryItem)
  });
}

showContent(loader)
fetch('https://restcountries.com/v3.1/all', {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
})
.then(response => {return response.json()})
.then(data => {
  hideContent(loader)
  generateHtml(data)
})
.catch(err => showContent(notFound))

// filter select function
filterByRegion.addEventListener('change', (e) => {
  elCountriesList.innerHTML = ''
  showContent(loader)
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then(response => {return response.json()})
  .then(data => {
    console.log(data)
    hideContent(loader)
    generateHtml(data)
  })
  .catch(err => showContent(notFound))
})


// Search input function
if(elSearchInput) {
  const countryName = document.getElementsByClassName('country__name')
  elSearchInput.addEventListener('input', e => {

    Array.from(countryName).forEach(country => {
      if(country.innerText.toLowerCase().includes(elSearchInput.value.toLowerCase())) {
        country.parentElement.parentElement.parentElement.style.display = "grid"
      } else {
        country.parentElement.parentElement.parentElement.style.display = "none"
      }
    })
  })
}
