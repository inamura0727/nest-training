import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

/*AuthGuradのjwtをカスタマイズする nestjsのpassportがjwt関係のプロテクションの機能を提供している。
使われ方はプロジェクトによって異なるため、カスタマイズしていく*/

@Injectable()
// PassportStartegyは抽象クラス
/*抽象クラスとは、オブジェクト指向プログラミング（OOP）で用いられる特殊なクラスで、実装を含まない宣言のみの抽象メソッドを含むもの。それ自身をインスタンス化することはできない。*/
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hashedPassword;
    return user;
  }
}
