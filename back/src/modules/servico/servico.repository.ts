import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Prisma, Servico } from "src/generated/prisma/client";

@Injectable()
export class ServicoRepository {

    constructor(
        private readonly prisma: DbService
    ) { }

    async create(data: Prisma.ServicoCreateInput): Promise<Servico> {
        return this.prisma.servico.create({
            data
        })
    }

    async findMany(select?: Prisma.ServicoSelect) {
        return this.prisma.servico.findMany({
            select
        })
    }

    async findOne(id: number, select?: Prisma.ServicoSelect) {
        return this.prisma.servico.findFirst({
            where: { id },
            select
        })
    }

    async update(id: number, data: Prisma.ServicoUpdateInput) {
        return this.prisma.servico.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return this.prisma.servico.delete({
            where: { id }
        })
    }

    // METODOS COMPLEMENTARES
    async buscarNomeServico(nome: string) {
        return this.prisma.servico.findFirst({
            where: { nome }
        })
    }
}