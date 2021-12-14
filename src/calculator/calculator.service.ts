import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

    calculate(expression: string): any {
      const Calc=require('expression-calculator');
      var calc = new Calc();

      // Checking sanctity of the expression
      try {
        var result = calc.compile(expression).calc();
      }

      // Catching any invalid expression
      catch(error) {
        console.log('Exception occurred: ' + error.message);

        // Check if the number is out of range
        if(error.message == 'Value of variable Infinity not specified.') return 'Result out of range';
        return 'Invalid Expression';
      }

      // Check if the result calculated is Nan
      if (isNaN(result)) return 'Not a Number';

      // Check if the number is whole or not
      if(Math.floor(result) == result){
        return result;
      }
      
      // Returning the result with 2 decimal places
      return result.toFixed(2); ;
      }
}
