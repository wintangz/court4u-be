import { IKeyTokenService } from './iKeyToken.service';
import { IKeyTokenRepository } from '../repository/iKeyToken.repository';
import { KeyTokenRepository } from '../repository/keyToken.repository';
import { keyTokens } from '@prisma/client';

export class KeyTokenService implements IKeyTokenService {
  private readonly _tokenRepository: IKeyTokenRepository;
  constructor() {
    this._tokenRepository = KeyTokenRepository.getInstance();
  }
  async createOrUpdateKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: {
    userId: string;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
  }): Promise<String | null> {
    const token = await this._tokenRepository.createOrUpdateKeyToken({
      userId,
      privateKey,
      publicKey,
      refreshToken,
    });
    return token ? token.publicKey : null;
  }

  public async foundKey({
    userId,
  }: {
    userId: string;
  }): Promise<keyTokens | null> {
    const found = await this._tokenRepository.foundKey({ userId });
    return found;
  }

  public async deleteKeyByUserId({ userId }: { userId: string }): Promise<any> {
    const result = await this._tokenRepository.deleteKeyByUserId({ userId });
    return result;
  }
  public async updateKeyToken({
    currentToken,
    refreshToken,
    userId,
  }: {
    userId: string;
    refreshToken: string;
    currentToken: keyTokens;
  }): Promise<any> {
    const result = await this._tokenRepository.updateKeyToken({
      currentToken,
      refreshToken,
      userId,
    });
    return result;
  }
}
