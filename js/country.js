window.addEventListener('DOMContentLoaded', () => {
  const countryName = new URLSearchParams(location.search).get('name'),
    countryPage = document.querySelector('.country-page__flag-info'),
    loader = document.querySelector('.loader-wrapper'),
    flagImg = countryPage.querySelector('.country-page__flag'),
    countryNameH1 = countryPage.querySelector('.country__name'),
    countryNativeName = countryPage.querySelector('.country__definition-description.native-name'),
    populationNumber = countryPage.querySelector('.country__definition-description.population-num'),
    region = countryPage.querySelector('.country__definition-description.region'),
    subRegion = countryPage.querySelector('.country__definition-description.sub-region'),
    capital = countryPage.querySelector('.country__definition-description.capital'),
    topLabelDomain = countryPage.querySelector('.country__definition-description.top-label-domain'),
    currencies = countryPage.querySelector('.country__definition-description.currency'),
    languages = countryPage.querySelector('.country__definition-description.languages'),
    borderCountriesList = countryPage.querySelector('.border-countries__list');

  // universal show content function
  function showContent(content) {
    content.classList.add('show')
  }

  // universal hide content function
  function hideContent(content) {
    content.classList.remove('show')
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country)
    flagImg.src = country.flags.svg
    flagImg.alt = `This is a ${country.name.common}'s flag`
    countryNameH1.innerText = country.name.common
    if(country.name.nativeName) {
      countryNativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      countryNativeName.innerText = country.name.common
    }

    populationNumber.innerText = country.population.toLocaleString(
      undefined,
      { minimumFractionDigits: 2 }
    )

    region.innerText = country.region

    if(country.subregion) {
      subRegion.innerText = country.subregion
    }

    if(country.capital) {
      capital.innerText = country.capital
    }

    topLabelDomain.innerText = country.tld.join(', ')
    if(country.currencies) {
      currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
    }

    if(country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => {
          const borderCountryTag = document.createElement('a')
          borderCountryTag.classList.add('border-countries__link')
          borderCountryTag.innerText = borderCountry.name.common
          borderCountryTag.href = `country-page.html?name=${borderCountry.name.common}`
          borderCountryTag.target = '_blank'
          borderCountriesList.append(borderCountryTag)
        })
      })
    }
  })

})
