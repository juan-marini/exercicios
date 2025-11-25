import * as readline from "readline";

const taxaDiaria = 0.025;

function calcularJuros(valor: number, dataVencimento: string) {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);

  const diffTime = hoje.getTime() - vencimento.getTime();
  const diasAtraso = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

  const juros = valor * taxaDiaria * diasAtraso;

  return { juros, diasAtraso };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Informe o valor: ", (valorStr) => {
  const valor = parseFloat(valorStr);

  rl.question("Informe a data de vencimento (AAAA-MM-DD): ", (dataVenc) => {
    const { juros, diasAtraso } = calcularJuros(valor, dataVenc);
    const total = valor + juros;

    console.log(`\nValor original: R$ ${valor.toFixed(2)}`);
    console.log(`Dias de atraso: ${diasAtraso}`);
    console.log(`Juros acumulado: R$ ${juros.toFixed(2)}`);
    console.log(`Valor total atualizado: R$ ${total.toFixed(2)}`);

    rl.close();
  });
});
