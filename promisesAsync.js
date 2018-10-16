const { opositores, notas } = require('./datos.js')

// crea promesa para obtener los datos del opositor 1
const getOpositores = (id) => {
  return new Promise((resolve, reject) => {
    const opositor = opositores.find((opositor) => opositor.id === id)
    if (opositor) {
      resolve(opositor)
    } else {
      reject(new Error(`No se ha encontrado al opositor con id: ${id}.`))
    }
  })
}

// crea promesa para obtener los datos del opositor 1
const getOpositor = async (id) => {
  const opositor = await opositores.find((opositor) => opositor.id === id)
  if (opositor) {
    return opositor
  } else {
    throw (new Error(`No se ha encontrado el opositor con id: ${id}.`))
  }
}

getOpositor(1)
  .then(opositor => console.log(`opositor: ${opositor.nombre}`))
  .catch(err => console.log(err))

// crea promesa para obtener las notas del opositor 1
const getNotas = async (id) => {
  const notasOpositor = await notas.filter((nota) => nota.id === id)
  if (notasOpositor.length) {
    return notasOpositor
  } else {
    throw (new Error(`No se ha encontrado notas del opositor con id: ${id}.`))
  }
}

getNotas(1)
  .then(notas => {
    notas.forEach(nota => {
      console.log(`prueba ${nota.prueba}, nota: ${nota.nota}`)
    })
  }
  )
  .catch(err => console.log(err))

/*

// crea promesa para obtener el nombre y las notas del opositor 1
const getResultado = (id) => {
  let nombre
  getOpositor(id)
    .then((opositor) => {
      nombre = opositor.nombre
      return getNotas(id)
    })
    .then((notas) => {
      const nota = notas.map((nota) => nota.nota).reduce((sum, x) => (sum + x) / notas.length)
      console.log(`nota media: ${nota}`)
    })
}

getResultado(1)

const getDatos = (id) => {
  Promise.all([getOpositor(id), getNotas(id)])
    .then(datos => {
      const { nombre } = datos[0]
      const nota = datos[1].map((nota) => nota.nota).reduce((sum, x) => (sum + x) / datos[1].length)
      console.log(`El opositor ${nombre} tiene una nota media de ${nota}`)
      // console.log(nombre)
      // console.log(nota)
    })
    .catch(err => console.log(err))
}

getDatos(2)
*/
