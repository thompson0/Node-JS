const express = require('express')
const app = express()
const PORT = 3000
const sqlite3 = require('sqlite3').verbose()
const winston = require('winston')
const path = require('path')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});
const db = new sqlite3.Database('./logs.db');
db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    path TEXT,
    headers TEXT,
    query TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  const logData = {
    ip: req.ip,
    path: req.originalUrl,
    headers: JSON.stringify(req.headers),
    query: JSON.stringify(req.query)
  };

  logger.info(`Acesso em ${logData.path} de ${logData.ip}`);

  db.run(
    `INSERT INTO logs (ip, path, headers, query) VALUES (?, ?, ?, ?)`,
    [logData.ip, logData.path, logData.headers, logData.query]
  );

  next();
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname ,'views','index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views','admin.html'));
});

app.get('/login', (req, res) => {
  res.send('Página de login');
});

app.get('/cmd', (req, res) => {
  res.send('Comando inválido');
});
app.listen(PORT, () => {
  console.log(`Honeypot rodando na porta ${PORT}`);
});