import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ServicoModule } from './modules/servico/servico.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';

@Module({
  imports: [UsuarioModule, ClienteModule, ServicoModule, AgendamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
