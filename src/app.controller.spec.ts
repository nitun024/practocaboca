import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CalculatorService } from './calculator/calculator.service';

describe('AppController', () => {
  let appController: AppController;
  let spyService: CalculatorService;
  const ApiServiceProvider = {
    provide: CalculatorService,
    useFactory: () => ({
      calculate: jest.fn(() => 72),
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ApiServiceProvider],
    }).compile();
    appController = app.get<AppController>(AppController);
    spyService = app.get<CalculatorService>(CalculatorService);

  });

    it('should call calculate for an expression', async () => {
      const expression = '(5*(3+1)-2)*(3+1)';
      appController.calculateExpression(expression);
      expect(spyService.calculate).toHaveBeenCalled();
    });

    it('should retrieve calculated value for an expression', async () => {
      const expression = '(5*(3+1)-2)*(3+1)';
      expect(spyService.calculate(expression)).toBe(72);
    });

});


describe('Invalid AppController', () => {
  let appController: AppController;
  let spyService: CalculatorService;
  const ApiServiceProvider = {
    provide: CalculatorService,
    useFactory: () => ({
      calculate: jest.fn(() => "Invalid Expression"),
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ApiServiceProvider],
    }).compile();
    appController = app.get<AppController>(AppController);
    spyService = app.get<CalculatorService>(CalculatorService);

  });

    it('should retrieve invalid expression value for an expression', async () => {
      const expression = '4/(2';
      expect(spyService.calculate(expression)).toBe("Invalid Expression");
    });

    it('should retrieve invalid expression value for an expression', async () => {
      const expression = '(5*(3+1)-2)*(3+1))';
      expect(spyService.calculate(expression)).toBe("Invalid Expression");
    });

});