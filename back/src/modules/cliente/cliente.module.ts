import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteRepository } from './cliente.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository
  ],
  exports: [ClienteService]
})
export class ClienteModule { }
