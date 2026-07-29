import { Module } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { DbModule } from 'src/db/db.module';
import { AtendimentoRepository } from './atendimento.repository';

@Module({
  imports: [DbModule],
  controllers: [AtendimentoController],
  providers: [
    AtendimentoService,
    AtendimentoRepository
  ],
  exports: [AtendimentoService]
})
export class AtendimentoModule {}