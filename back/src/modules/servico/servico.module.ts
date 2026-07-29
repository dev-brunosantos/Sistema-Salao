import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { DbModule } from 'src/db/db.module';
import { ServicoRepository } from './servico.repository';

@Module({
  imports: [DbModule],
  controllers: [ServicoController],
  providers: [
    ServicoService,
    ServicoRepository
  ],
  exports: [ServicoService]
})
export class ServicoModule {}
