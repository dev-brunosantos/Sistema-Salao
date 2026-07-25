import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Cliente, Prisma } from "src/generated/prisma/client";

@Injectable()
export class ClienteRepository {

    constructor(
        private readonly prisma: DbService
    ) { }

    async create(
        data: Prisma.ClienteCreateInput
    ): Promise<Cliente> {
        return this.prisma.cliente.create({
            data
        })
    }

    async findMany(select?: Prisma.ClienteSelect) {
        return this.prisma.cliente.findMany({
            select
        })
    }

    async findOne(id: number, select?: Prisma.ClienteSelect) {
        return this.prisma.cliente.findUnique({
            where: { id },
            select
        })
    }

    async update(id: number, data: Prisma.ClienteUpdateInput) {
        return this.prisma.cliente.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return this.prisma.cliente.delete({
            where: { id }
        })
    }

    // METODOS COMPLEMENTARES   
    async filtrarClientesPorNome(nome: string) {
        return this.prisma.cliente.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        })
    }
}