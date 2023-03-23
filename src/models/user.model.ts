import { EUserRole } from "src/enums/userRole.enum";

export interface IUser {
  id: number;
  name: string;
  role: EUserRole;
}