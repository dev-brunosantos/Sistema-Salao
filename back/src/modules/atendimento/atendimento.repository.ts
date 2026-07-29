import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Prisma, Atendimento } from "src/generated/prisma/client";

@Injectable()
export class AtendimentoRepository {

    constructor(
        private readonly prisma: DbService
    ) { }

    async create(
        data: Prisma.AtendimentoCreateInput,
        tx?: Prisma.TransactionClient
    ): Promise<Atendimento> {

        const db = tx ?? this.prisma;

        return db.atendimento.create({
            data
        })
    }

    async findMany(select?: Prisma.AtendimentoSelect) {
        return this.prisma.atendimento.findMany({
            select
        })
    }

    async findOne(id: number, select?: Prisma.AtendimentoSelect) {
        return this.prisma.atendimento.findFirst({
            where: { id },
            select
        })
    }

    async update(id: number, data: Prisma.AtendimentoUpdateInput) {
        return this.prisma.atendimento.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return this.prisma.atendimento.delete({
            where: { id }
        })
    }
}