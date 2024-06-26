import { club } from '@prisma/client';
import { IClubRepository } from './interface/iClub.repository';
import prisma from '../lib/prisma';

export class ClubRepository implements IClubRepository {
  private static Instance: ClubRepository;
  public static getInstance(): IClubRepository {
    if (!ClubRepository.Instance) {
      ClubRepository.Instance = new ClubRepository();
    }
    return ClubRepository.Instance;
  }
  public async addClub({
    courtOwnerId,
    name,
    address,
    district,
    cityOfProvince,
    logoUrl,
    description,
  }: {
    courtOwnerId: string;
    name: string;
    address: string;
    district: string;
    cityOfProvince: string;
    logoUrl: string | null;
    description: string;
  }): Promise<club> {
    return await prisma.club.create({
      data: {
        courtOwnerId,
        address,
        cityOfProvince,
        district,
        name,
        description,
        logoUrl,
      },
    });
  }

  public async foundClub({ options }: { options: any }): Promise<club | null> {
    return await prisma.club.findFirst(options);
  }

  public async getClubs(): Promise<club[]> {
    return await prisma.club.findMany();
  }

  public async updateClub(
    clubId: string,
    data: {
      name?: string;
      address?: string;
      district?: string;
      cityOfProvince?: string;
      logoUrl?: string;
      description?: string;
    }
  ): Promise<club> {
    return await prisma.club.update({
      where: {
        id: clubId,
      },
      data,
    });
  }

  public async deleteClub({ id }: { id: string }): Promise<club> {
    return await prisma.club.update({
      where: {
        id,
      },
      data: {
        status: 'disable',
      },
    });
  }
}
