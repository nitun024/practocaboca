import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CalculatorService } from './calculator/calculator.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      newListener: true,
      ignoreErrors: false
    }),
    InMemoryDBModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [CalculatorService],
})
export class AppModule {}
