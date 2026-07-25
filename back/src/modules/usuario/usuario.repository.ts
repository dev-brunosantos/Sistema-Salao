import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Prisma, Usuario } from "src/generated/prisma/client";

@Injectable()
export class UsuarioRepository {

    constructor(
        private readonly prisma: DbService
    ) { }

    async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
        return this.prisma.usuario.create({
            data
        })
    }

    async findMany(select?: Prisma.UsuarioSelect) {
        return this.prisma.usuario.findMany({
            select
        })
    }

    async findOne(id: number, select?: Prisma.UsuarioSelect) {
        return this.prisma.usuario.findUnique({
            where: { id },
            select
        })
    }

    async update(id: number, data: Prisma.UsuarioUpdateInput) {
        return this.prisma.usuario.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return this.prisma.usuario.delete({
            where: { id }
        })
    }

    // METODOS COMPLEMENTARES

    async buscarEmail(email: string) {
        return this.prisma.usuario.findUnique({
            where: { email }
        })
    }

    async filtrarUsuarioPorNome(nome: string) {
        return this.prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome.split(' ')[0]
                }
            }
        })
    }

    async usuarioNome(nome: string) {
        return this.prisma.usuario.findFirst({
            where: { nome }
        })
    }

    async buscarNomeUsuario(nomeUsuario: string) {
        return this.prisma.usuario.findUnique({
            where: { usuario: nomeUsuario }
        })
    }
}