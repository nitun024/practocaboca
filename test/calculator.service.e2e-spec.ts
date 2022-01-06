import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CalculatorService } from '../src/calculator/calculator.service';
import { INestApplication } from '@nestjs/common';

describe('Calculator', () => {
    let app: INestApplication;
    let calculatorService: CalculatorService;
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });
  

    it(`should return valid result`,  async () => {
      const expression = '(5*(3+1)-2)*(3+1)';
      const response = await request(app.getHttpServer()).get('/calculate/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('72');
    });

    it(`should store calculated expressions in db`,  async () => {
      var expression1 = '(5*(3+1)-2)*(3+1)';
      var expression2 = '2*2';
      var expression3 = '0/0';
      var response = await request(app.getHttpServer()).get('/calculate/'+expression1);
      response = await request(app.getHttpServer()).get('/calculate/'+expression2);
      response = await request(app.getHttpServer()).get('/calculate/'+expression3);
      expect(response.status).toBe(200);
      response = await request(app.getHttpServer()).get('/history/1');
      expect(response.status).toBe(200);
      expect(response.text).toContain(expression1);
      expect(response.text).toContain(expression2);
      expect(response.text).toContain(expression3);
    });

    it(`should return invalid expression`,  async () => {
      const expression = '(5())';
      const response = await request(app.getHttpServer()).get('/calculate/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should return invalid expression when passed null`,  async () => {
      const expression = null;
      const response = await request(app.getHttpServer()).get('/calculate/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should return invalid expression when passed blank expression`,  async () => {
      const expression = '    ';
      const response = await request(app.getHttpServer()).get('/calculate/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should not allow string`,  async () => {
      const expression = 'two+two';
      const response = await request(app.getHttpServer()).get('/calculate/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });
    
      
});
  
    