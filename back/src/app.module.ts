import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ServicoModule } from './modules/servico/servico.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { AtendimentoModule } from './modules/atendimento/atendimento.module';

@Module({
  imports: [UsuarioModule, ClienteModule, ServicoModule, AgendamentoModule, AtendimentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
