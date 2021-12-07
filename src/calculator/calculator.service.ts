import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

    // calculate(expression: string): string {
    //     return 'Not implemented yet123';
    // }

    getHello(): string {
        return 'Hello Neo';
      }
}
