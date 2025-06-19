import { Module } from '@nestjs/common';
import { RefreshTokenFactory } from './refresh-token.factory';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [],
  providers: [RefreshTokenService, RefreshTokenRepository, RefreshTokenFactory],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
