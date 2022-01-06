import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface ExpressionEntity extends InMemoryDBEntity {
    expression: string;
    userid: number;
}