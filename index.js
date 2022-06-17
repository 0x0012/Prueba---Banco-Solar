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
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(fs.readFileSync('index.html', 'utf8'))
    }
  
    // Recibe los datos de un nuevo usuario y lo almacena en PostgreSQL
    if (req.url == '/usuario' && req.method == 'POST') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = Object.values(JSON.parse(body))
        const respond = await newUser(data)
        res.end(JSON.stringify(respond))
      })
    }
  
    // Devuelve todos los usuarios registrados con sus balances
    if (req.url == '/usuarios' && req.method == 'GET') {
      const users = await getUsers()
      res.end(JSON.stringify(users))
    }
  
    // Recibe los datos modificados de un usuario registrado y los actualiza
    if (req.url.startsWith('/usuario?') && req.method == 'PUT') {
      const { id } = url.parse(req.url, true).query
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = [id, ...Object.values(JSON.parse(body))]
        const respond = await updateUser(data)
        res.end(JSON.stringify(respond))
      })
    }
  
    // Recibe el id de un usuario registrado y lo elimina
    if (req.url.startsWith('/usuario?') && req.method == 'DELETE') {
      const { id } = url.parse(req.url, true).query
      const respond = await deleteUser(id)
      res.end(JSON.stringify(respond)) 
    }
    
    // Recibe los datos para realizar una nueva transferencia
    if (req.url == '/transferencia' && req.method == 'POST') {
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        const data = Object.values(JSON.parse(body))
        const respond = await transfer(data)
        res.end(JSON.stringify(respond))
      })
    }
  
    // Devuelve todas las transacciones almacenadas en la DB
    if (req.url == '/transferencias' && req.method == 'GET') {
      const users = await getTransfers()
      res.end(JSON.stringify(users))
    }
  })
  .listen(3000, console.log('$ Servidor Banco Solar', {status: 'online', port: 3000, url: 'http://localhost:3000'}))