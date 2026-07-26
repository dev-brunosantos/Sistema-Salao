import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoRepository } from './agendamento.repository';
import { DbModule } from 'src/db/db.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ServicoModule } from '../servico/servico.module';

@Module({
  imports: [
    DbModule,
    ClienteModule,
    ServicoModule
  ],
  controllers: [AgendamentoController],
  providers: [
    AgendamentoService, 
    AgendamentoRepository
  ],
})
export class AgendamentoModule {}
