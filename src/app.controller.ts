import { Controller, Get, Param } from '@nestjs/common';
// import { AppService } from './app.service';
import { CalculatorService } from './calculator/calculator.service';

@Controller()
export class AppController {
  constructor(private readonly appService: CalculatorService) {}

  @Get()
  getHello(): string {
    // Get the expression from the path param
    // Use the calculator service to calculate the answer
    return this.appService.getHello();
  }
}
