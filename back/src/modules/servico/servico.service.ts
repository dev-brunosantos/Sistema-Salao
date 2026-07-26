import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { ServicoRepository } from './servico.repository';

@Injectable()
export class ServicoService {

  constructor(
    private readonly servicoRepository: ServicoRepository
  ) { }

  async create(createServicoDto: CreateServicoDto) {
    const servicoExistente = await this.servicoExistente(createServicoDto.nome);

    if (servicoExistente) {
      throw new ConflictException(
        'O serviço informado já esta cadastrado no sistema.'
      )
    }

    const novoServico = await this.servicoRepository.create(createServicoDto)

    return {
      msg: `Serviço ${novoServico.nome.toUpperCase()} criado com sucesso.`,
      servico: novoServico
    }
  }

  async findAll() {
    const servicos = await this.servicoRepository.findMany();
    return servicos;
  }

  async findOne(id: number) {
    const servico = await this.servicoRepository.findOne(id);

    if (!servico) {
      throw new NotFoundException(
        'O ID informado não esta vinculado a nenhum serviço cadastrado no sistema.'
      )
    }

    return servico;
  }

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    const servico = await this.findOne(id);

    const servicoAtualizado = await this.servicoRepository.update(
      servico.id, updateServicoDto
    );

    return {
      msg: 'Servico atualizado com sucesso.',
      dadosAnteriores: servico,
      dadosAtualizados: servicoAtualizado
    }
  }

  async remove(id: number) {
    const servico = await this.findOne(id);
    await this.servicoRepository.delete(servico.id);

    return {
      msg: `Os dados do serviço ${servico.nome.toUpperCase()} foram excluídos com sucesso.`
    }
  }

  // METODOS COMPLEMENTARES
  async servicoExistente(nome: string): Promise<boolean> {
    return !!await this.servicoRepository.buscarNomeServico(nome)
  }

  async buscarServicoNome(nome:string) {
    const servico = await this.servicoRepository.buscarNomeServico(nome);

    if (!servico) {
      throw new NotFoundException(
        'O Serviço informado não está cadastrado no sistema.'
      )
    }

    return servico
  }
}
