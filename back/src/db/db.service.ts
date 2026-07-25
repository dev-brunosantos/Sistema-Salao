import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'src/generated/prisma/client';

import { config } from "dotenv";

config()

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        const adapter = new PrismaBetterSqlite3({
            url: process.env.DATABASE_URL
        })

        super({ adapter })
    }

    async onModuleInit() {
        const prismaClient = await this.$connect();
        return prismaClient
    }

    async onModuleDestroy() {
        const prismaClient = await this.$disconnect();
        return prismaClient
    }
}
