export interface GroupUserDto {
  userId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  joinedAtUtc: Date;
  isAdm: boolean;
}
