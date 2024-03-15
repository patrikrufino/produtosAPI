class StringUtils {
    constructor() { }

    removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    removerEspacosEmBranco(texto) {
        // Expressão regular para espaços em branco no início e fim da string
        const regexEspacosEmBranco = /^\s+|\s+$/g;
      
        // Retorna a string com espaços em branco removidos
        return texto.replace(regexEspacosEmBranco, "");
      }

    normalizaString(texto) {
        texto = this.removerAcentos(texto);
        texto = this.removerEspacosEmBranco(texto)
        return texto;
    }
}

module.exports = StringUtils;