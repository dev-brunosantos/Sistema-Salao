import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { AtendimentoRepository } from './atendimento.repository';
import { StatusAtendimento, StatusPagamento } from 'src/generated/prisma/enums';

@Injectable()
export class AtendimentoService {

  constructor(
    private readonly atendimentoRepository: AtendimentoRepository
  ) { }

  // async create(createAtendimentoDto: CreateAtendimentoDto) {
  //   const novoAtendimento = await this.atendimentoRepository.create({
  //     agendamento: {
  //       connect: {
  //         id: createAtendimentoDto.agendamentoID
  //       }
  //     },
  //     status: StatusAtendimento.PENDENTE,
  //     statusPagamento: StatusPagamento.PENDENTE,
  //     descricao: 'Atendimento criado com sucesso.',
  //   })

  //   return {
  //     msg: 'Atendimento criado com sucesso.',
  //     atendimento: novoAtendimento
  //   }
  // }

  async findAll() {
    const atendimentos = await this.atendimentoRepository.findMany();
    return atendimentos;
  }

  async findOne(id: number) {
    const atendimento = await this.atendimentoRepository.findOne(id);

    if (!atendimento) {
      throw new NotFoundException(
        'O ID informado não esta vinculado a nenhum atendimento cadastrado no sistema.'
      )
    }

    return atendimento;
  }

  async update(id: number, updateAtendimentoDto: UpdateAtendimentoDto) {
    const atendimento = await this.findOne(id);

    let msgDescricao = '';
    let statusPagamento: StatusPagamento = 'PENDENTE';

    if (updateAtendimentoDto.statusAtendimento == StatusAtendimento.INICIADO) {
      msgDescricao = `Atendimento inciado com sucesso.`
    }

    if (updateAtendimentoDto.statusAtendimento == StatusAtendimento.FINALIZADO) {
      msgDescricao = `Atendimento concluído com sucesso. Aguardanto comprovação de pagamento.`;
      statusPagamento = StatusPagamento.PAGO;
    }

    const atendimentoAtualizado = await this.atendimentoRepository.update(
      atendimento.id, {
      descricao: msgDescricao,
      status: updateAtendimentoDto.statusAtendimento,
      statusPagamento: statusPagamento
    }
    );

    return {
      msg: 'Dados do atendimento atualizados com sucesso.',
      dadosAnteriores: atendimento,
      dadosAtualizados: atendimentoAtualizado
    }

  }

  async remove(id: number) {

    const atendimento = await this.findOne(id);

    await this.atendimentoRepository.delete(atendimento.id)

    return {
      msg: 'Dados do atendimento excluídos com sucesso'
    }
  }
}
