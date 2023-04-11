import { EUserRole } from "src/enums/userRole.enum";
import { IRuleDots } from "./rules.model";

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

export interface IFuzzyResult {
  graphs: Array<IRuleDots>;
  result: number;
  resultTerm: string;
  resultFunc: IRuleDots;
}