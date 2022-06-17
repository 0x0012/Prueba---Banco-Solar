/*
 * Prueba - Banco Solar
 * @author Max Coronado Lorca
 */

// Servidor de rutas para aplicacion de transacciones del Banco Solar

const http = require('http')
const url = require('url')
const fs = require('fs')

http
  .createServer(async (req, res) => {
    if (req.url == '/' && req.method == 'GET') {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(fs.readFileSync('index.html', 'utf8'))
    }
  })
  .listen(3000, console.log('$ Servidor Banco Solar', {status: 'online', port: 3000, url: 'http://localhost:3000'}))