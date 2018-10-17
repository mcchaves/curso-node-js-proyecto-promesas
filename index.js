const axios = require('axios')

// obtengo el valor de las monedas de dolar y yenes
// const exchangeRate = (from, to) => {
//   return axios.get(`http://data.fixer.io/api/latest?access_key=6457d181501c460463a0989ee95883f9&base=EUR&symbols=${from},${to}`)
//     .then((response) => {
//       const { rates } = response.data
//       return rates[to] / rates[from]
//     })
// }
// exchangeRate('USD', 'JPY').then((cambioDivisa) => console.log(cambioDivisa))
// exchangeRate('USD', 'EUR').then((cambioDivisa) => console.log(cambioDivisa))
// exchangeRate('EUR', 'JPY').then((cambioDivisa) => console.log(cambioDivisa))
// exchangeRate('EUR', 'USD').then((cambioDivisa) => console.log(cambioDivisa))

//   .catch((err) => console.log(err))

// mismo resultado pero con async await
const getExchangeRate = async (from, to) => {
  const response = await axios
    .get(`http://data.fixer.io/api/latest?access_key=6457d181501c460463a0989ee95883f9&base=EUR&symbols=${from},${to}`)
  const { rates } = response.data
  return rates[to] / rates[from]
}
getExchangeRate('USD', 'JPY')
  .then(cambioDivisa => console.log(cambioDivisa))
  .catch(err => console.log(err))

// obtengo los paises de las monedas
const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => { return response.data.map((country) => country.name) }
  )
}

// getCountries('USD').then((countries) => {
//   console.log(countries[18])
// })

getCountries('JPY').then((countries) => {
  console.log(countries)
})

// mismo resultado pero con async await
const getCountriesRate = async (currencyCode) => {
  const response = await axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
  return response.data.map((country) => country.name)
}
getCountriesRate('USD').then((ciudades) => {
  console.log(ciudades) // ciudades[18] es United Stated of America
})

// Convierto x cantidad de una moneda a otra
const convertCurrency = (from, to, amount) =>
  getExchangeRate(from, to).then(cambioDivisa =>
    (amount * cambioDivisa).toFixed(2))

// const getResultado = (from, to, amount) => {
//   convertCurrency(from, to, amount).then((total) => {
//     getCountries(to).then((paises) => {
//       console.log(`El cambio de ${from} a ${to} es ${total}.  Los puedes gastar en:`)
//       paises.forEach(pais => {
//         console.log(pais)
//       })
//     })
//   })
// }
// getResultado('USD', 'JPY', 200)

// lo mismo pero con async away
const getResultados = async (from, to, amount) => {
  const resultado = await Promise.all([convertCurrency(from, to, amount), getCountries(to)])
  console.log(`El cambio de ${from} a ${to} es ${resultado[0]}.  Los puedes gastar en: ${resultado[1].join(',')}`)
}
getResultados('USD', 'JPY', 200)
