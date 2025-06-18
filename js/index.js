// Declarando data
const data = document.getElementById("data");
const dataLong = document.getElementById("dataLong");

// declarando forms
const form = document.querySelector("form");
const input = document.querySelector("input");

// Declarando a aba dos dados principais
const valor = document.getElementById("valor");
const valorInput = document.getElementById("valorInput");
const valorI = document.getElementById("valorI");
const valorExtenso = document.getElementById("valorExtenso");
const descritivo = document.getElementById("descritivo");
const valorDigitado = document.getElementById("valorDigitado");

// Campo referente
const InputReferente = document.getElementById("referente");
const referenteE = document.getElementById("referenteE");


// Campo nome
const InputNomeCompleto = document.getElementById("InputNomeCompleto");
const nome = document.getElementById("nome");

// Campo CPF
const cpf = document.getElementById("cpf");
const resultCPF = document.getElementById("cpfResult");


/**
 * Dados Opcionais:
*/
const inputEmpresa = document.getElementById("inputEmpresa");
const inputCNPJ = document.getElementById("inputCNPJ");
const inputEndereco = document.getElementById("inputEndereco");
const nomeEmpresa = document.getElementById("nomeEmpresa");
const cnpj = document.getElementById("cnpj");
const endereco = document.getElementById("endereco");

// Fim dos Dados Opcionais />

// Botões
const idValor = document.getElementById("idValor");
const imprimir = document.getElementById("imprimir");
const reflesh = document.getElementById("reflesh");

/**
 * Adicionando funções do tempo
 */

const temperaTura = document.getElementById("temperaTura");
const cidade = 'Rio+Verde,BR';
const url = `https://api.open-meteo.com/v1/forecast?latitude=-17.7921255&longitude=-50.9191219&current_weather=true`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const temp = data.current_weather.temperature;
    temperaTura.innerText = `${temp}° Rio Verde - GO`;
  })
  .catch(error => console.error('Erro ao obter dados meteorológicos:', error));



// Adicionando função horas >
function Horas(){
    date = new Date().toLocaleDateString();
    data.innerText = date;
    datalong = new Date();
    const opcoes = {day: 'numeric', month: 'long', year: 'numeric'}
   let datalonga = datalong.toLocaleDateString('pt-BR', opcoes);
   dataLong.innerText = datalonga;

   const idDate = Date.now().toString().slice(-4);
   idValor.innerText = idDate + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}
Horas()
// Fim da função horas />

/**
 * Adicionando funções do form para evitar o reload>
 */
form.addEventListener("submit", (e)=>{
    e.preventDefault();
})


form.oninput = (e) =>{
    // Função de barrar o carregamento automático
    e.preventDefault();

    // Funcao de validação de valores
    const valor$ = valorInput.value;
    const regex = /\D+/g;
    valorInput.value = valorInput.value.replace(regex, "")
    const valorConvert = conversaoValores(valor$ / 100);
    valor.innerText = valorConvert;
    valorI.innerText = valorConvert;
    valorDigitado.innerText = valorConvert;

    valorPorExtenso(Number(valor$ / 100));

    // Descrevendo os valores por extenso
    nome.innerText = InputNomeCompleto.value.toUpperCase();
    descritivo.innerText = valorExtenso.value;
    referenteE.innerText = InputReferente.value;

    // Validação de CPF
    let valorCpf = cpf.value.replace(/\D+/g, "");
    valorCpf = valorCpf.replace(/(\d{3})(\d)/, "$1.$2");
    valorCpf = valorCpf.replace(/(\d{3})(\d)/, "$1.$2");
    valorCpf = valorCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpf.value = valorCpf;
    resultCPF.innerText = valorCpf;
}
// Fim dos Forms />

/**
 * Criando função de converter o valor digitado em linguagem natural por extenso 
 */
    function valorPorExtenso(valor$) {

    function numeroPTexto(valor) {
    if (valor === 0) return "zero";

    const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    const partes = [];

    function blocoExtenso(numero) {
        let texto = "";

        const centena = Math.floor(numero / 100);
        const dezena = Math.floor((numero % 100) / 10);
        const unidade = numero % 10;

        if (numero === 100) return "cem";

        if (centena > 0) texto += centenas[centena];

        if (dezena === 1) {
            texto += (texto ? " e " : "") + especiais[unidade];
        } else {
            if (dezena > 0) texto += (texto ? " e " : "") + dezenas[dezena];
            if (unidade > 0) texto += (texto ? " e " : "") + unidades[unidade];
        }

        return texto;
    }

    const grupos = [
        { nome: "bilhão", plural: "bilhões" },
        { nome: "milhão", plural: "milhões" },
        { nome: "mil", plural: "mil" },
        { nome: "", plural: "" }
    ]; // esses grupos é um modelo de array objects

    let numStr = valor.toString().padStart(12, "0"); // deixei o limite de até 999 bilhões
    const blocos = [
        parseInt(numStr.slice(0, 3)),   // ou seja > bilhões
        parseInt(numStr.slice(3, 6)),   //         > milhões
        parseInt(numStr.slice(6, 9)),   //         > milhar
        parseInt(numStr.slice(9, 12))   //         > unidades
    ];

    blocos.forEach((bloco, i) => {
        if (bloco > 0) {
            let nomeGrupo = blocos[i] === 1 ? grupos[i].nome : grupos[i].plural;
            let blocoTexto = blocoExtenso(bloco);
            if (grupos[i].nome === "mil" && bloco === 1) {
                partes.push("mil");
            } else {
                partes.push(`${blocoTexto}${nomeGrupo ? " " + nomeGrupo : ""}`);
            }
        }
    }); // Só recapitulando que o método forEach() traduzindo para pseudocódigo [ paraCada() ] ele percorre cada elemento array. [1, 2, 3, 4...]

    return partes.join(" e ");
}



    let valor = parseFloat(valor$).toFixed(2);
    const partes = valor.split(".");
    const reais = parseInt(partes[0]);
    const centavos = parseInt(partes[1]);

    let extenso = "";

    if (reais > 0) {
        extenso += numeroPTexto(reais) + (reais === 1 ? " real" : " reais");
    }

    if (centavos > 0) {
        extenso += (extenso ? " e " : "") + numeroPTexto(centavos) + (centavos === 1 ? " centavo" : " centavos");
    }

    if (extenso === "") {
        extenso = "zero real";
    }

    valorExtenso.value = extenso;
    descritivo.innerText = extenso;

}
// Fim de converter número em linguagem natural por extenso.


/**
 * Função de cortar o tamanho correto o CNPJ
 */
inputCNPJ.addEventListener("input", () => {
    const numeros = inputCNPJ.value.replace(/\D+/g, "");
    if (numeros.length > 14) return; // corta se passar de 14 números
    const formatado = numeros.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
    cnpj.innerText = formatado;
})
inputEndereco.addEventListener("input", () =>{
    endereco.innerText = inputEndereco.value.toUpperCase();
})
inputEmpresa.addEventListener("input", () =>{
    nomeEmpresa.innerText = inputEmpresa.value.toUpperCase();
})
// Fim da função cnpj


// Adicionando funções de converter valores em Reais
function conversaoValores(v){
    return Number(v).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}


/**
 * Inicio das funções botões de resetar e imprimir>
 */
reflesh.addEventListener("click", () =>{
    history.go(0);
})
imprimir.addEventListener("click", (e)=>{
    e.preventDefault();
    
    window.print();
})
const salvarPdf = document.getElementById("salvarPdf");
const salvarAqui = document.getElementById("salvarAqui");
salvarPdf.addEventListener("click", (e)=>{
    e.preventDefault();

  const opcoes = {
  margin:       10,            // adicionando as margens em mm
  filename:     'meu-arquivo.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' } // convertendo para folha A4
};
html2pdf().set(opcoes).from(salvarAqui).save();
})

// Fim das funções de botões de resetar e imprimir/>