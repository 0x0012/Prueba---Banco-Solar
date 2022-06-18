/*
 * Prueba - Banco Solar
 * @author Max Coronado Lorca
 */

// Servidor de rutas para aplicacion de transacciones del Banco Solar

const http = require('http')
const url = require('url')
const fs = require('fs')
const { newUser, getUsers, updateUser, deleteUser, transfer, getTransfers } = require('./queries')

http
  .createServer(async (req, res) => {
    // Devuelve la aplicacion cliente
    if (req.url == '/' && req.method == 'GET') {
      fs.readFile('index.html', (err, data) => {
        if (!err) {
          res.writeHead(200, { 'content-type': 'text/html' })
          res.end(data)
        } else {
          res.statusCode = 500
          res.end()
        }
      })
    }
  
    // Recibe los datos de un nuevo usuario y lo almacena en PostgreSQL
    if (req.url == '/usuario' && req.method == 'POST') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = Object.values(JSON.parse(body))
        try {
          const respond = await newUser(data)
          res.statusCode = 201
          res.end(JSON.stringify(respond))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify(error))
        }
      })
    }
  
    // Devuelve todos los usuarios registrados con sus balances
    if (req.url == '/usuarios' && req.method == 'GET') {
      try {
        const users = await getUsers()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(users))
      } catch (error) {
        res.statusCode = 500
        res.end(JSON.stringify(error))
      }
    }
  
    // Recibe los datos modificados de un usuario registrado y los actualiza
    if (req.url.startsWith('/usuario?') && req.method == 'PUT') {
      const { id } = url.parse(req.url, true).query
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = [id, ...Object.values(JSON.parse(body))]
        try {
          const respond = await updateUser(data)
          res.writeHead(200, { 'content-type': 'application/json'})
          res.end(JSON.stringify(respond))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify(error))
        }
      })
    }
  
    // Recibe el id de un usuario registrado y lo elimina
    if (req.url.startsWith('/usuario?') && req.method == 'DELETE') {
      const { id } = url.parse(req.url, true).query
      try {
        const respond = await deleteUser(id)
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(respond)) 
      } catch (error) {
        res.statusCode = 500
        res.end(JSON.stringify(error))
      }
    }
    
    // Recibe los datos para realizar una nueva transferencia
    if (req.url == '/transferencia' && req.method == 'POST') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = Object.values(JSON.parse(body))
        try {
          const respond = await transfer(data)
          res.writeHead(201, { 'content-type': 'application/json' })
          res.end(JSON.stringify(respond))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify(error))
        }
      })
    }
  
    // Devuelve todas las transacciones almacenadas en la DB
    if (req.url == '/transferencias' && req.method == 'GET') {
      try {
        const users = await getTransfers()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(users))
      } catch (error) {
        res.statusCode = 500
        res.end(JSON.stringify(error))
      }
    }
  })
  .listen(3000, console.log('$ Servidor Banco Solar', {status: 'online', port: 3000, url: 'http://localhost:3000'}))