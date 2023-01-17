import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
// PrismaClientの機能を取り込むために継承する
export class PrismaService extends PrismaClient {
  // PrismaServiceの中でConfigServiceを使用するためDIする
  constructor(private readonly config: ConfigService) {
    // PrismaClientクラスに中にあるconstructorの処理をsuperで参照すること可能
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
