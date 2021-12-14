import { Controller, Get, Param } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';

@Controller()
export class AppController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('/:expression(*)')
  // Use the calculator service to calculate the answer
  calculateExpression(@Param('expression') expression): string {
    return this.calculatorService.calculate(expression);
  }
}
