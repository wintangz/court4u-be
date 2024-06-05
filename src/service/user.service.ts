import { $Enums, users } from '@prisma/client';
import { UserRepository } from '../repository/user.repository';
import { IUserService } from './iUser.service';

export class UserService implements IUserService {
  public async getUserByEmail({
    email,
  }: {
    email: string;
  }): Promise<users | null> {
    const options = {
      where: {
        email,
      },
    };
    return await UserRepository.getInstance().getUser({ options });
  }
  public async createNewUser({
    username,
    password,
    email,
    phone,
    status,
    role,
    otp,
  }: {
    username: string;
    password: string;
    email: string;
    phone: string;
    status: string;
    role: string[];
    otp: string;
  }): Promise<users> {
    const options = {
      data: {
        username,
        password,
        email,
        phone,
        status,
        role,
        otp,
      },
    };
    return await UserRepository.getInstance().createNewUser({ options });
  }

  public async updateUser({ options }: { options: any }): Promise<users> {
    return await UserRepository.getInstance().updateUser({ options });
  }

  public async updateUserAfterVerify({ otp }: { otp: string }): Promise<users> {
    const options = {
      where: {
        otp,
      },
      data: {
        status: 'active',
        otp: null,
      },
    };
    return await UserRepository.getInstance().updateUser({ options });
  }

  public async createOrUpdateGoogleUser({
    email,
    googleId,
    googleAccessToken,
    username,
    avatarUrl,
  }: {
    email: string;
    googleId: string;
    googleAccessToken: string;
    username: string;
    avatarUrl: string;
  }): Promise<users> {
    const options = {
      where: {
        googleId,
      },
      update: {
        googleAccessToken,
      },
      create: {
        googleId,
        googleAccessToken,
        email,
        username,
        avatarUrl,
        status: 'active',
      },
    };
    const user = await UserRepository.getInstance().upsertUser({ options });
    return user;
  }

  public async createOrUpdateFacebookUser({
    email,
    facebookId,
    facebookAccessToken,
    username,
    avatarUrl,
  }: {
    email: string;
    facebookId: string;
    facebookAccessToken: string;
    username: string;
    avatarUrl: string;
  }): Promise<users> {
    const options = {
      where: {
        facebookId,
      },
      update: {
        facebookAccessToken,
      },
      create: {
        facebookId,
        facebookAccessToken,
        email,
        username,
        avatarUrl,
        status: 'active',
      },
    };
    const user = await UserRepository.getInstance().upsertUser({ options });
    return user;
  }
}
