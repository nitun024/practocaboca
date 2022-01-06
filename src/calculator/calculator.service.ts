import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ExpressionCreatedEvent } from './events/expression-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ExpressionEntity } from './expression/entities/expression.entity';


@Injectable()
export class CalculatorService {

  constructor(private eventEmitter: EventEmitter2, private expressionService: InMemoryDBService<ExpressionEntity> ) {}

    calculate(expression: string): any {
      const Calc=require('expression-calculator');
      var calc = new Calc();

      // Emit Event
      const expressionCreatedEvent = new ExpressionCreatedEvent();
      expressionCreatedEvent.expression = expression;
      expressionCreatedEvent.userid = 1;
      this.eventEmitter.emit('expression.created', expressionCreatedEvent);
      console.log('Event emitted')

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

    @OnEvent('expression.created', { async: true })
    handleExpressionCreatedEvent(event: ExpressionCreatedEvent) {
      console.log("Event received ");

      this.expressionService.create(
        {
          userid: event.userid,
          expression: event.expression,
        }
      );

      console.log("Expression:  " + event.expression + " stored in to the database")
    }  
}
