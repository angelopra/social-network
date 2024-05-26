export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  tags: string[];
  about?: string;
}
