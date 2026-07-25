import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioRepository
  ],
})
export class UsuarioModule {}
