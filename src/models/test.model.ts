export interface ITest {
  Key: number;
  Name: string;
  Test_Type_Key: number;
  Questions: Array<ITestQuestion>;
}

export interface ITestQuestion {
  Key: number;
  questionPhoto?: string;  
  Header: string;
  Answer: Array<ITestQuestionAnswer>;
}

export interface ITestQuestionAnswer {
  Key: number;
  Text: string;
  Question_Key: number;
  Img_Key: number;
  photo?: string;
  IsCorrect: boolean;
}

export interface ITestUserAnswer {
  id: number;
  answers: Array<ITestQuestionUserAnswer>;
}

export interface ITestQuestionUserAnswer {
  id: number;
  answerId: number;
}