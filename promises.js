const opositores = [{
  id: 1,
  nombre: 'Pepe',
  especialidad: 'Informática'
}, {
  id: 2,
  nombre: 'Leyre',
  especialidad: 'Sistemas y aplicaciones informáticas'
}]

const notas = [{
  id: 1,
  prueba: 'Práctica',
  nota: 3.5
}, {
  id: 1,
  prueba: 'Teórica',
  nota: 6.5
}, {
  id: 2,
  prueba: 'Práctica',
  nota: 7.5
}, {
  id: 2,
  prueba: 'Teórica',
  nota: 8.5
}
]

// crea promesa para obtener los datos del opositor 1
const getOpositor = (id) => {
  return new Promise((resolve, reject) => {
    const opositor = opositores.find((opositor) => opositor.id === id)
    if (opositor) {
      resolve(opositor)
    } else {
      reject(new Error(`No se ha encontrado al opositor con id: ${id}.`))
    }
  })
}

getOpositor(1)
  .then(opositor => console.log(`opositor: ${opositor.nombre}`))
  .catch(err => console.log(err))
/*
getOpositor(5)
  .then(opositor => console.log(`opositor: ${opositor.name}`))
  .catch(err => console.log(err))
*/

// crea promesa para obtener las notas del opositor 1

const getNotas = (id) => {
  return new Promise((resolve, reject) => {
    const notasOpositor = notas.filter((nota) => nota.id === id)
    if (notasOpositor.length) {
      resolve(notasOpositor)
    } else {
      reject(new Error(`No se ha encontrado notas del opositor con id: ${id}.`))
    }
  })
}

getNotas(1)
  .then(notas => {
    // console.log(notas)
    notas.forEach(nota => {
      console.log(`prueba ${nota.prueba}, nota: ${nota.nota}`)
    })
  }
  )
  .catch(err => console.log(err))

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
// Pepe tiene una media de 5 en la oposición de Informática
