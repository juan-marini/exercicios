import * as fs from "fs";
import * as path from "path";

type Produto = {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
};

type EstoqueDados = {
  estoque: Produto[];
};

type Movimentacao = {
  id: number;
  codigoProduto: number;
  descricao: string;
  quantidade: number;
  estoqueFinal: number;
};

const arquivoEstoque = path.join(__dirname, "estoque.json");

const dados: EstoqueDados = JSON.parse(fs.readFileSync(arquivoEstoque, "utf8"));

function movimentarEstoque(
  codigoProduto: number,
  quantidade: number,
  descricao: string
): Movimentacao | null {
  const produto = dados.estoque.find(p => p.codigoProduto === codigoProduto);
  if (!produto) {
    console.log("Produto não encontrado!");
    return null;
  }

  produto.estoque += quantidade;

  const movimento: Movimentacao = {
    id: new Date().getTime(),
    codigoProduto,
    descricao,
    quantidade,
    estoqueFinal: produto.estoque
  };

  fs.writeFileSync(arquivoEstoque, JSON.stringify(dados, null, 2));

  console.log("=== MOVIMENTAÇÃO REALIZADA ===");
  console.log(movimento);

  return movimento;
}

movimentarEstoque(101, -10, "Saída para venda");
movimentarEstoque(103, 25, "Entrada de reposição");
movimentarEstoque(105, -5, "Saída de amostra");
