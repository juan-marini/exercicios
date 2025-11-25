import * as fs from 'fs';

type FaturamentoDia = {
    dia: number;
    valor: number;
};

const dados: FaturamentoDia[] = JSON.parse(fs.readFileSync('faturamento.json', 'utf-8'));

const valoresValidos = dados.filter(f => f.valor > 0).map(f => f.valor);

const menor = Math.min(...valoresValidos);
const maior = Math.max(...valoresValidos);
const media = valoresValidos.reduce((a, b) => a + b, 0) / valoresValidos.length;
const diasAcimaMedia = valoresValidos.filter(v => v > media).length;

console.log(`Menor faturamento: ${menor}`);
console.log(`Maior faturamento: ${maior}`);
console.log(`Dias acima da média: ${diasAcimaMedia}`);
