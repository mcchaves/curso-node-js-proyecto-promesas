const fs = require('fs')
const Promise = require('bluebird')

// lectura de datos de forma síncrona
/*
const numero1 = fs.readFileSync('./numero1', 'utf-8')
const numero2 = fs.readFileSync('./numero2', 'utf-8')
*/

// lectura de datos de forma asíncrona
fs.readFile('./numero1', (err, data) => {
  if (err) console.log(err)
  const numero1 = parseInt(data)
  // console.log(`el primer numero es ${numero1}`)

  fs.readFile('./numero2', (err, data) => {
    if (err) console.log(err)
    const numero2 = parseInt(data)
    // console.log(`el primer numero es ${numero2}`)
    console.log(`El resultado de la suma de ${numero1} y ${numero2} es  ${numero1 + numero2}`)
  })
})

// lectura de datos con promesas
const getData = (fileName, type) => new Promise(
  (resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(parseInt(data))
    })
  }
)

const promise1 = getData('numero1', 'utf-8')
const promise2 = getData('numero2', 'utf-8')
Promise.all([promise1, promise2])
  . then((arrayValues) => {
    const sum = arrayValues.reduce((sum, x) => sum + x)
    console.log(`Suma con promesas.  El resultado es ${sum}`)
  })

// usando fs-extra
const promise11 = getData('numero1', 'utf-8')
const promise12 = getData('numero2', 'utf-8')
Promise.all([promise11, promise12])
  . then((arrayValues) => {
    const sum = arrayValues.reduce((sum, x) => parseInt(sum) + parseInt(x))
    console.log(`Suma con promesas.  El resultado es ${sum}`)
  })
