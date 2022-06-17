/*
 * Prueba - Banco Solar
 * @author Max Coronado Lorca
 */

// Consultas PostgreSQL

const { Pool } = require('pg')

const pool = new Pool({
  user: 'xiin',
  host: 'localhost',
  password: 'sirio',
  port: 5432,
  database: 'bancosolar'
})

// Recibe los datos de un nuevo usuario y lo almacena en PostgreSQL
const newUser = async data => {
  const query = {
    text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)",
    values: data
  }
  try {
    const result = await pool.query(query)
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Devuelve todos los usuarios registrados con sus balances
const getUsers = async () => {
  try {
    const { rows: result } = await pool.query("SELECT * FROM usuarios")
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Recibe los datos modificados de un usuario registrado y los modifica
const updateUser = async data => {
  const query = {
    text: "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *",
    values: data
  }
  try {
    const result = await pool.query(query)
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Recibe el id de un usuario registrado y lo elimina
const deleteUser = async id => {
  try {
    const result = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`)
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Reibe los datos para realizar una nueva transferencia
const transfer = async data => {
  // Reconstruye data con ids del emisor y receptor
  let goodData = []
  try {
    const emitter = await getUserId(data[0])
    const receptor = await getUserId(data[1])
    goodData = [emitter, receptor, data[2]]
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
  
  pool.query("BEGIN")
  try {
    // Intenta el ingreso de un nuevo registro en transferencias
    const result = await pool.query({
      text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())",
      values: goodData
    })
    
    // Intenta actualizaz el balance del emisor
    await pool.query({
      text: "UPDATE usuarios SET balance = balance - $2 WHERE id = $1",
      values: [goodData[0], goodData[2]]
    }) 
    
    // Intenta actualizaz el balance del receptor
    await pool.query({
      text: "UPDATE usuarios SET balance = balance + $2 WHERE id = $1",
      values: [goodData[1], goodData[2]]
    })
    
    // Todo OK
    await pool.query('COMMIT')
    return result
       
  } catch (error) {
    await pool.query("ROLLBACK")
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Devuelve rodas las transferencias almacenadas en formato de arrelo
// El arreglo devuelto es de la forma [fecha, nombre emisor, nombre receptor, monto]
const getTransfers = async () => {
  try {
    const { rows: result } = await pool.query({
      text: `SELECT t.fecha AS fecha, e.nombre AS emisor, r.nombre AS receptor, t.monto AS monto
              FROM transferencias as t
              JOIN usuarios AS e ON t.emisor = e.id
              JOIN usuarios AS r ON t.receptor = r.id`,
      rowMode: 'array'
    })
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

// Devuelve la primera ocurrencia de id para un nombre dado
const getUserId = async name => {
  try {
    const { rows: id } = await pool.query(`SELECT id FROM usuarios WHERE nombre = '${name}'`)
    return id[0].id
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

module.exports = { newUser, getUsers, updateUser, deleteUser, transfer, getTransfers }