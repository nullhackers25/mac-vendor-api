// Importa o banco de dados
const macDatabase = require('../data/mac-vendors.json');

export default function handler(req, res) {
  // Habilita CORS para seu app Android poder acessar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Pega o prefixo do MAC da URL (ex: ?mac=001788)
  const { mac } = req.query;
  
  if (!mac) {
    return res.status(400).json({ 
      error: 'Parâmetro "mac" é obrigatório' 
    });
  }
  
  // Limpa o MAC (remove : e -) e pega os 6 primeiros caracteres
  const cleanMac = mac.replace(/[:\-]/g, '').toUpperCase();
  const prefix = cleanMac.substring(0, 6);
  
  // Busca no banco
  const vendor = macDatabase[prefix] || 'Desconhecido';
  
  // Log para você ver as consultas (útil)
  console.log(`MAC: ${mac} → Prefixo: ${prefix} → Fabricante: ${vendor}`);
  
  // Retorna o resultado
  res.status(200).json({ 
    mac,
    prefix,
    vendor,
    success: vendor !== 'Desconhecido'
  });
}
