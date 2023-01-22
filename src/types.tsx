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
}

export interface ITest {
  currentTestTitle: string
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