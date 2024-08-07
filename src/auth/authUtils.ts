import Jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from '../helper/asyncHandler';
import { NextFunction, Request, Response } from 'express';
import { AuthFailure, BadRequestError } from '../handleResponse/error.response';
import { IKeyTokenService } from '../service/interface/iKeyToken.service';
import { KeyTokenService } from '../service/keyToken.service';
import prisma from '../lib/prisma';
import { jwtDecode } from 'jwt-decode';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
    refreshToken?: any;
    keyStores: any;
    clubId?: any;
  }
}
export const createTokenPair = async ({
  payload,
  publicKey,
  privateKey,
}: {
  payload: any;
  publicKey: string;
  privateKey: string;
}): Promise<any> => {
  try {
    const accessToken = await Jwt.sign(payload, publicKey, {
      expiresIn: '1 days',
    });

    const refreshToken = await Jwt.sign(payload, privateKey, {
      expiresIn: '3 days',
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded: { userId: string; email: string } = jwtDecode(
      req.headers['authorization']!
    );

    const userId = decoded.userId;

    const _keyTokenService: IKeyTokenService = new KeyTokenService();
    if (typeof userId !== 'string')
      throw new AuthFailure('Not found client id');
    const keyStore = await _keyTokenService.foundKey({
      userId: userId,
    });

    if (!keyStore) throw new AuthFailure('Key Store not found');

    const refreshToken = req.headers['refresh-token'];
    // If login with access token is fail, use refresh token to login
    if (refreshToken) {
      if (Array.isArray(refreshToken)) {
        throw new AuthFailure('Invalid refresh token format');
      }
      try {
        const decodeUser = (await Jwt.verify(
          refreshToken,
          keyStore.privateKey
        )) as JwtPayload;
        if (userId !== decodeUser.userId) {
          throw new AuthFailure('Invalid user');
        }
        req.user = decodeUser;
        req.refreshToken = refreshToken;
        req.keyStores = keyStore;
      } catch (error) {
        throw new AuthFailure('auth error');
      }
    }

    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      throw new AuthFailure('Invalid request');
    }

    try {
      const decodeUser = Jwt.verify(
        accessToken,
        keyStore.publicKey
      ) as JwtPayload;
      if (userId !== decodeUser.userId) {
        throw new AuthFailure('Invalid user');
      }
      req.user = decodeUser;
      req.keyStores = keyStore;
      next();
    } catch (error) {
      throw error;
    }
  }
);

export const CheckApiKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apikey = req.headers['api-key'];

      if (!apikey)
        throw new BadRequestError('Api key is require for this action');
      const club = await prisma.club.findFirst({
        where: {
          apiKey: apikey as string,
        },
      });
      if (!club) throw new BadRequestError('Club not found');
      req.clubId = club.id;
      next();
    } catch (error) {
      throw error;
    }
  }
);
