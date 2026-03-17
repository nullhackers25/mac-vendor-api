import fs from 'fs';
import path from 'path';

// Carrega o JSON uma vez só (melhor performance)
const jsonPath = path.join(process.cwd(), 'data', 'mac-vendors.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

export default function handler(req, res) {
  const { mac } = req.query;

  // Validação básica
  if (!mac) {
    return res.status(400).json({ error: 'MAC não fornecido' });
  }

  try {
    const prefix = mac.replace(/[:\-]/g, '').substring(0, 6).toUpperCase();
    const vendor = data[prefix] || 'Desconhecido';

    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
      mac,
      prefix,
      vendor
    });

  } catch (err) {
    return res.status(500).json({ error: 'Erro interno' });
  }
}
