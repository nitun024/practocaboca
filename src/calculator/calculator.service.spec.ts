import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { AppController } from '../app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';


describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
      imports: [
        EventEmitterModule.forRoot({
          newListener: true,
          ignoreErrors: false
        }),
        InMemoryDBModule.forRoot(),
      ]
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an integer value', async () => {
    const expression = '4/2';
    expect(service.calculate(expression)).toBe(2);
  });

  it('should return a float value', async () => {
    const expression = '4/2.53';
    expect(service.calculate(expression)).toBe("1.58");
  });

  it('should return Not a Number', async () => {
    const expression = '0/0';
    expect(service.calculate(expression)).toBe("Not a Number");
  });

  it('should retrieve calculated complex expression', async () => {
    const expression = '(5*(3+1)-2)*(3+1)';
    expect(service.calculate(expression)).toBe(72);
  });

  it('should return invalid expression', async () => {
    const expression = '(5())';
    expect(service.calculate(expression)).toBe("Invalid Expression");
  });

  it('should return invalid expression when passed null', async () => {
    const expression = null;
    expect(service.calculate(expression)).toBe("Invalid Expression");
  });

  it('should return negative value', async () => {
    const expression = '(5*(3+1)-2)*(3-4)';
    expect(service.calculate(expression)).toBe(-18);
  });

  it('should allow spaces between integers or operators', async () => {
    const expression = '5 * 2 + 3 ';
    expect(service.calculate(expression)).toBe(13);
  });

  it('should return invalid expression when passed blank expression', async () => {
    const expression = '   ';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should return result out of range for max positive number', async () => {
    const expression = (Number.MAX_VALUE*2).toString();
    expect(service.calculate(expression)).toBe('Result out of range');
  });

  it('should return result out of range for max negative number', async () => {
    const expression = (Number.NEGATIVE_INFINITY).toString();
    expect(service.calculate(expression)).toBe('Result out of range');
  });

  it('should return invalid expression', async () => {
    const expression = '1+';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should return invalid expression', async () => {
    const expression = '+1';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should return the same integer', async () => {
    const expression = '1';
    expect(service.calculate(expression)).toBe(1);
  });

  it('should allow negative integer', async () => {
    const expression = '-1';
    expect(service.calculate(expression)).toBe(-1);
  });

  it('should allow nested brackets', async () => {
    const expression = '(((3)))';
    expect(service.calculate(expression)).toBe(3);
  });

  it('should not allow curly brackets', async () => {
    const expression = '3*{2}';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should not allow square brackets', async () => {
    const expression = '3*[2]';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should not allow string', async () => {
    const expression = 'test';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should not allow string mixed with Integer', async () => {
    const expression = 'O*0';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

  it('should not allow multiplication without * symbol', async () => {
    const expression = '4(3)';
    expect(service.calculate(expression)).toBe('Invalid Expression');
  });

});
