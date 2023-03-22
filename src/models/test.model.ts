export interface ITest {
  id: number;
  name: string;
  questions: Array<ITestQuestion>;
}

export interface ITestQuestion {
  id: number;
  questionName: string;
  questionPhoto?: string;  
  answers: Array<ITestQuestionAnswer>;
}

export interface ITestQuestionAnswer {
  id: number;
  name: string;
  photo?: string;
}

export interface ITestUserAnswer {
  id: number;
  answers: Array<ITestQuestionUserAnswer>;
}

export interface ITestQuestionUserAnswer {
  id: number;
  answerId: number;
}