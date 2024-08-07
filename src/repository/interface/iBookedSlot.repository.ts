import { bookedSlot, checkInStatus, Prisma } from '@prisma/client';

export interface IBookedSlotRepository {
  createBookedSlot(
    data: {
      bookingId: string;
      date: Date;
      slotId: string;
      checkedIn: checkInStatus;
      price: number;
    }[]
  ): Promise<Prisma.BatchPayload>;
  findBookedSlot(id: string): Promise<bookedSlot | null>;
  findBookedSlotByDateAndSlotId({
    date,
    slotId,
  }: {
    date: Date;
    slotId: string;
  }): Promise<bookedSlot[]>;
  getAllBookedSlot(): Promise<bookedSlot[]>;
  deleteManyBookedSlot(bookingId: string): Promise<void>;
  getSlotByBookingId(bookingId: string): Promise<bookedSlot[]>;
  updateCheckIn({
    bookedSlotId,
    checkIn,
  }: {
    bookedSlotId: string;
    checkIn: checkInStatus;
  }): Promise<bookedSlot>;
  getBookedSlotByClubId(clubId: string): Promise<bookedSlot[]>;
}
