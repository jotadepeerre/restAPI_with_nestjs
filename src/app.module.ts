import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
// Importamos el módulo de mongoose
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  //añadimos el Modulo de mongoose que controlará la conexión con la base de datos
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/product', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
