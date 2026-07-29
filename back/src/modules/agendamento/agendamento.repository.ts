import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Prisma, Agendamento } from "src/generated/prisma/client";

@Injectable()
export class AgendamentoRepository {

    constructor(
        private readonly prisma: DbService
    ) { }

    async create(
        data: Prisma.AgendamentoCreateInput,
        tx?: Prisma.TransactionClient,
    ): Promise<Agendamento> {

        const db = tx ?? this.prisma;

        return db.agendamento.create({
            data
        })
    }

    async findMany(select?: Prisma.AgendamentoSelect) {
        return this.prisma.agendamento.findMany({
            select
        })
    }

    async findOne(id: number, select?: Prisma.AgendamentoSelect) {
        return this.prisma.agendamento.findFirst({
            where: { id },
            select
        })
    }

    async update(id: number, data: Prisma.AgendamentoUpdateInput) {
        return this.prisma.agendamento.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return this.prisma.agendamento.delete({
            where: { id }
        })
    }
}