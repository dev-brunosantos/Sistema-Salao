import { StatusAtendimento, StatusPagamento } from "src/generated/prisma/enums";

export class CreateAtendimentoDto {
    agendamentoID: number;
    statusAtendimento: StatusAtendimento;
    statusPagamento: StatusPagamento;
    descricao: string;
}
