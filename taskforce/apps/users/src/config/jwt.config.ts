import {ConfigService, registerAs} from '@nestjs/config';
import {JwtModuleOptions} from '@nestjs/jwt';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.secret'),
    signOptions: { expiresIn: '6000s', algorithm: 'HS256' }
  }
}
