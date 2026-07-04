const fs = require('fs');
let content = fs.readFileSync('seed.js', 'utf8');
content = content.replace(/price:\s*([\d.]+),/g, (m, p1) => `price: ${Math.round(parseFloat(p1) * 83)},`);
content = content.replace(/mrp:\s*([\d.]+),/g, (m, p1) => `mrp: ${Math.round(parseFloat(p1) * 83)},`);
fs.writeFileSync('seed.js', content);
console.log('Updated prices in seed.js');
