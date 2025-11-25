import * as fs from "fs";
import path from "path";

type Venda = {
  vendedor: string;
  valor: number;
};

type DadosVendas = {
  vendas: Venda[];
};

const dados: DadosVendas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "vendas.json"), "utf8")
);

function calcularComissao(valor: number): number {
  if (valor < 100) {
    return 0;
  }
  if (valor < 500) {
    return valor * 0.01;
}
  return valor * 0.05;
}

function gerarRelatorio(vendas: Venda[]) {
  const resultado: Record<string,{ totalVendas: number; totalComissao: number }> = {};

  for (let i = 0; i < vendas.length; i++) {
    const venda = vendas[i];
    const comissao = calcularComissao(venda.valor);

    if (!resultado[venda.vendedor]) {
      resultado[venda.vendedor] = { totalVendas: 0, totalComissao: 0 };
    }

    resultado[venda.vendedor].totalVendas += venda.valor;
    resultado[venda.vendedor].totalComissao += comissao;
  }

  return resultado;
}

console.log("=== RELATÓRIO DE COMISSÕES ===");
console.log(gerarRelatorio(dados.vendas));
