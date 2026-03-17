// api/mac.js
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const { mac } = req.query;
  
  // Caminho CORRETO: sobe um nível e entra em data/
  const jsonPath = path.join(process.cwd(), 'data', 'mac-vendors.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const prefix = mac.replace(/[:\-]/g, '').substring(0, 6).toUpperCase();
  const vendor = data[prefix] || 'Desconhecido';
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ prefix, vendor });
}
