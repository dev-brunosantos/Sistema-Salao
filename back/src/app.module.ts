import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ServicoModule } from './modules/servico/servico.module';

@Module({
  imports: [UsuarioModule, ClienteModule, ServicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
