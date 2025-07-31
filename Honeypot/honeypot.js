const express = require('express')
const app = express()
const PORT = 3000
const sqlite3 = require('sqlite3').verbose()
const uuidv4 = require('uuid').v4;
const winston = require('winston')
const useragent = require('useragent');
const path = require('path')
const fs = require('fs');
const LOG_FILE = path.join(__dirname, 'logs.json');

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
    id: uuidv4(),
    ip: req.headers['x-forwarded-for'] || req.ip,
    method: req.method,
    path: req.originalUrl,
    headers: JSON.stringify(req.headers),
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
    userAgent: req.get('User-Agent'),
    referer: req.get('Referer'),
    cookies: JSON.stringify(req.cookies),
    timestamp: new Date().toISOString()
  };

  const agent = useragent.parse(req.headers['user-agent']);
  logData.device = agent.device.toString();
  logData.os = agent.os.toString();
  logData.browser = agent.toAgent();
  
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      const data = fs.readFileSync(LOG_FILE, 'utf8');
      logs = JSON.parse(data);
    } catch (e) {
      logger.error('Erro ao ler logs.json');
    }
  }
  logs.push(logData);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  
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