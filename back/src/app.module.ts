import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ClienteModule } from './modules/cliente/cliente.module';

@Module({
  imports: [UsuarioModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
