export interface IRule {
  id: number;
  statements: Array<IRuleStatement>;
  result: string;
}

export interface IRuleStatement {
  name: string,
  value: string,
}