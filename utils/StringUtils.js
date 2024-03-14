class StringUtils {
    constructor() { }

    removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}

module.exports = StringUtils;