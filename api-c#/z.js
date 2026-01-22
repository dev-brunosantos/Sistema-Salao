const fs = require('fs')
const path = require('path')

const pastas = ['controllers', 'services', 'entities', 'repositories', 'dtos']

const arquivos = [
    'usuarios', 'clientes', 'carteira', 'clienteHistorico',
    'documentos', 'produtos', 'estoque', 'pedidos',
    'tipoPagamentos', 'pagamentos'
]

function renomeaItem(item) {
    let itemRenomeado = item.replace(item[0], item[0].toUpperCase())
    return itemRenomeado
}

function criarPastas() {
    pastas.forEach(p => {
        let pastaRenomeada = renomeaItem(p)
        let caminho = path.join(__dirname, pastaRenomeada)

        fs.mkdirSync(caminho, { recursive: true })

        criarArquivos(pastaRenomeada, caminho)
    })

    if (fs.existsSync("Repositories")) {
        let caminhoInterfaces = path.join(__dirname, 'Repositories', 'Interfaces')
        fs.mkdirSync(caminhoInterfaces, { recursive: true })

        criarArquivos('Interfaces', caminhoInterfaces)
    }
}

function criarArquivos(pasta, caminho) {
    arquivos.forEach(a => {
        let arquivoRenomeado = renomeaItem(a)

        let novoArquivo = pasta == "Interfaces" ?
            `I${arquivoRenomeado}Repositories.cs` :
            `${arquivoRenomeado}${pasta}.cs`

        fs.writeFileSync(path.join(caminho, novoArquivo), '', 'utf8')
    })
}

criarPastas()