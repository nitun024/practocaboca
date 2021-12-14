import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CalculatorService } from '../src/calculator/calculator.service';
import { INestApplication } from '@nestjs/common';
import { waitForDebugger } from 'inspector';

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
      const response = await request(app.getHttpServer()).get('/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('72');
    });

    it(`should return invalid expression`,  async () => {
      const expression = '(5())';
      const response = await request(app.getHttpServer()).get('/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should return invalid expression when passed null`,  async () => {
      const expression = null;
      const response = await request(app.getHttpServer()).get('/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should return invalid expression when passed blank expression`,  async () => {
      const expression = '    ';
      const response = await request(app.getHttpServer()).get('/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });

    it(`should not allow string`,  async () => {
      const expression = 'two+two';
      const response = await request(app.getHttpServer()).get('/'+expression);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Invalid Expression');
    });
    
      
});
  
    