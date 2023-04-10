import { EUserRole } from "src/enums/userRole.enum";

export interface IUser {
  id: number;
  name: string;
  role: IUserRole;
}

export interface IUserRole {
  Key: number;
  Name: EUserRole;
  ShName: string;
}
