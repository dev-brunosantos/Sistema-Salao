import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DbService } from 'src/db/db.service';
import { ClienteRepository } from './cliente.repository';

@Module({
  imports: [DbService],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository
  ],
})
export class ClienteModule {}
