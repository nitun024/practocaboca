import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ExpressionEntity } from './calculator/expression/entities/expression.entity'

@Controller()
export class AppController {
  constructor(private readonly calculatorService: CalculatorService,
    private expressionService: InMemoryDBService<ExpressionEntity>,
) {}

  @Get('/calculate/:expression(*)')
  // Use the calculator service to calculate the answer
  calculateExpression(@Param('expression') expression): string {
    return this.calculatorService.calculate(expression);
  }

  @Get('/history/:userid')
  getExpressionsForUserId(@Param('userid') userid: string) {
    return this.expressionService.query(data => data.userid === +userid);
  }

}
