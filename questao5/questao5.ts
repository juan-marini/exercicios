const texto = "Exemplo de string";
let invertido = "";

for (let i = 0; i < texto.length; i++) {
    invertido = texto[i] + invertido;
}

console.log(`String invertida: ${invertido}`);
