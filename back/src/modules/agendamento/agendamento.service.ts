import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { AgendamentoRepository } from './agendamento.repository';
import { DbService } from 'src/db/db.service';
import { ClienteService } from '../cliente/cliente.service';
import { ServicoService } from '../servico/servico.service';
import { StatusAgendamento, StatusAtendimento, StatusPagamento } from 'src/generated/prisma/enums';
import { AtendimentoService } from '../atendimento/atendimento.service';
import { AtendimentoRepository } from '../atendimento/atendimento.repository';

@Injectable()
export class AgendamentoService {

  constructor(
    private readonly prisma: DbService,
    private readonly agendamentoRepository: AgendamentoRepository,
    private readonly clienteService: ClienteService,
    private readonly servicoService: ServicoService,
    private readonly atendimentorepository: AtendimentoRepository,

  ) { }

  async create(createAgendamentoDto: CreateAgendamentoDto) {

    const cliente = await this.clienteService.filtrarNomeCliente(createAgendamentoDto.nomeCliente);
    const servico = await this.servicoService.buscarServicoNome(createAgendamentoDto.nomeServico);

    const resultado = await this.prisma.$transaction(async (tx) => {
      const novoAgendamento = await this.agendamentoRepository.create(
        {
          cliente: {
            connect: {
              id: cliente.id,
              nome: cliente.nome
            }
          },
          servico: {
            connect: {
              id: servico.id,
              nome: servico.nome
            }
          },
          data: createAgendamentoDto.dara,
          status: StatusAgendamento.PENDENTE
        }, tx);

      const novoAtendimento = await this.atendimentorepository.create(
        {
          agendamento: {
            connect: {
              id: novoAgendamento.id,
            }
          },
          status: StatusAtendimento.PENDENTE,
          statusPagamento: StatusPagamento.PENDENTE,
          descricao: 'Atendimento criado com sucesso.',
        }, tx);

        return {
          novoAgendamento,
          novoAtendimento
        }

    })

    return {
      msg: 'Agendamento criado com sucesso.',
      agendamento: resultado.novoAgendamento,
      atendimento: resultado.novoAtendimento.descricao
    }
  }

  async findAll() {
    const agendamentos = await this.agendamentoRepository.findMany();
    return agendamentos;
  }

  async findOne(id: number) {
    const servico = await this.agendamentoRepository.findOne(id);

    if (!servico) {
      throw new NotFoundException(
        'O ID informado não esta vinculado a nenhum agendamento cadastrado no sistema.'
      )
    }

    return servico;
  }

  update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    return `This action updates a #${id} agendamento`;
  }

  async remove(id: number) {
    const agendamento = await this.findOne(id);

    await this.agendamentoRepository.delete(agendamento.id);

    return {
      msg: 'Os dados do agendamento foram excluídos com sucesso.'
    }
  }
}
