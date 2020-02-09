class ItemCarrinho {
    constructor(
        public id: number,
        public imagem: object,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number

    ) {}
}

//outra forma de exportar sem ser por default
export { ItemCarrinho }