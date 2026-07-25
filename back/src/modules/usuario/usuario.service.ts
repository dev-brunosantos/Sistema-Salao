import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { hash } from "bcrypt";

@Injectable()
export class UsuarioService {

  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const emailExistente = await this.verificaEmail(createUsuarioDto.email)

    if(emailExistente) {
      throw new ConflictException(
        'O E-mail informado já esta vinculado a outro usuário.'
      )
    }

    let nomeUsuario = '';
    let nomeUsuarioExistente: boolean;

    do {
      nomeUsuario = this.criaNomeUsuario(createUsuarioDto.nome)
      nomeUsuarioExistente = await this.verificaNomeUsuario(nomeUsuario)
    } while (nomeUsuarioExistente == true);

    const novoUsuario = await this.usuarioRepository.create({
      nome: createUsuarioDto.nome,
      usuario: nomeUsuario,
      email: createUsuarioDto.email,
      senha: await hash(createUsuarioDto.senha, 10),

    })

    return novoUsuario;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.findMany();
    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne(id);

    if(!usuario) {
      throw new NotFoundException(
        'O ID informado não esta vinculado a nenhum usuário cadastrado no sistema.'
      )
    }

    return usuario;
  }

  async findName(nome: string) {
    const usuario = await this.usuarioRepository.filtrarUsuarioPorNome(nome);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    const usuarioAtualizado = await this.usuarioRepository.update(
      usuario.id,
      {
        nome: updateUsuarioDto.nome ?? usuario.nome,
        email: updateUsuarioDto.email ?? usuario.email, 
      }
    );

    return {
      msg: 'Dados atualizados com sucesso.',
      dadosAnteriores: usuario,
      dadosAtualizados: usuarioAtualizado
    }
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);

    await this.usuarioRepository.delete(usuario.id);

    return {
      msg: `Os dados do usuário ${usuario.nome.toUpperCase()} foram excluídos do sistema com sucesso.`
    }
  }

  // METODOS COMPLEMENTARES

  async verificaEmail(email: string): Promise<boolean> {
    return !!await this.usuarioRepository.buscarEmail(email);
  }

  private criaNomeUsuario(nome: string) {
    const nomeFormatado = nome.split(' ')[0];
    const numeroUsuario = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    const nomeUsuario = `${nomeFormatado}${numeroUsuario}`

    return nomeUsuario;
  }

  private async verificaNomeUsuario(nome: string): Promise<boolean> {
    const nomeUsuarioExistente = await this.usuarioRepository.buscarNomeUsuario(nome);
    return !!nomeUsuarioExistente
  }
}
