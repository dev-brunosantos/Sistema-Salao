import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteRepository } from './cliente.repository';

@Injectable()
export class ClienteService {

  constructor(
    private readonly clienteRepository: ClienteRepository
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    const novoCliente = await this.clienteRepository.create(createClienteDto)
    return novoCliente;
  }

  async findAll() {
    const clientes = await this.clienteRepository.findMany()
    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne(id);

    if (!cliente) {
      throw new NotFoundException(
        'O ID informado não está vinculado a nenhum cliente cadastrado no sistema.'
      )
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne.apply(id);

    const clienteAtualizado = await this.clienteRepository.update(cliente.id, updateClienteDto);

    return {
      msg: `Os dados do cliente ${cliente.nome} foram atualizados com sucesso.`,
      dadosAnteriores: cliente,
      dadosAtualizados: clienteAtualizado
    }
  }

  async remove(id: number) {
    const cliente = await this.findOne.apply(id);

    await this.clienteRepository.delete(cliente.id);

    return {
      msg: `Os dados do cliente ${cliente.nome} foram excluídos com sucesso.`
    }
  }

  // METODOS COMPLEMENTARES

  private async filtrarClientesPorNome(nome: string) {
    const clientes = await this.clienteRepository.filtrarClientesPorNome(nome);
    return clientes;
  }
}
