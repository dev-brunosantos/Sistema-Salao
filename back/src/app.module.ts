import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { CargosModule } from './cargos/cargos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
  imports: [DbModule, CargosModule, UsuariosModule, DocumentosModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
