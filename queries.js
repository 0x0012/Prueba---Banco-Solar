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

const getUsers = async () => {
  try {
    const { rows: result } = await pool.query("SELECT * FROM usuarios")
    return result
  } catch (error) {
    console.log('ERROR', { code: error.code, message: error.message})
    return(error)
  }
}

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

module.exports = { newUser, getUsers, updateUser }