class Categoria {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    async Cadastrar() {
        await prisma.categoria.create({
            data: {
                nome: this.nome,
            }
        });

        console.log(`Categoria "${this.nome}" cadastrada com sucesso!`);
    }

    async Listar() {
        const categorias = await prisma.categoria.findMany();
        console.log("Listando todas as categorias:");
        categorias.forEach((categoria) => console.log(categoria.nome));
    }
}