# Prueba - Banco Solar  
## How to ...
> * Install and configure [git](https://git-scm.com/)
> * Install and configure [Node.js](https://nodejs.org/)
> * Install and configure [PostgreSQL](https://www.postgresql.org/)
> * Clone this: `git clone https://github.com/0x0012/Prueba---Banco-Solar`
> * Import *bancosolar.sql* file to PostgreSQL
>   * Run *SQL Shell*
>   * Create database `CREATE DATABASE bancosolar;`
>   * Import database `\! psql -h localhost -U postgres -d bancosolar -f %fileroute%\bancosolar.sql`
> * Inicialice NPM on root folder project: `npm install`
> * Run server: `node ./index.js`
> * Open http://localhost:3000