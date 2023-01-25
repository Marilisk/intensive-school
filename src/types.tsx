export type TestListItemType = {
  id: number
  title: string
}

export type AuthType = {
  fio: string
  phone: string
  email: string
}

export interface IAuthVisitor {
  authState: AuthType
  setAuthState: (arg: AuthType) => void
  testsList: TestListItemType[]
  setQuestions: (arg: QuestionItemType[]) => void
  questions: QuestionItemType[]
}

export interface ITest {
  currentTestTitle: string
  currentTestId: number
  questions: QuestionItemType[]
}
export type AnswerItemType = {
  text: string
  score: number
}
export type QuestionItemType = {
  question: string
  image: string
  answers: AnswerItemType[]
}