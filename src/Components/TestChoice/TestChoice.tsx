import { FC, useState } from "react";
import c from './TestChoice.module.scss';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import { QuestionItemType, TestListItemType } from "../../types";
import { Test } from "../Test/Test";
import { instance } from "../../api/api";

interface ITestChoiceProps {
    testsList: TestListItemType[]
    questions: QuestionItemType[]
    setQuestions: (arg: QuestionItemType[]) => void

}

export const TestChoice: FC<ITestChoiceProps> = ({ testsList, questions, setQuestions }: ITestChoiceProps) => {
    const [currentTestTitle, setCurrentTestTitle] = useState('')
    const [currentTestId, setCurrentTestId] = useState(0)

    const fetchTest = async (id: number) => {
        try {
            const response = await instance(`/test/${id}/`)
            setQuestions(response.data.listQuestions)
        } catch (error) {
            console.log(error)
            alert('не удалось получить список вопросов')
        }
    }
    const chooseTest = (id: number, title: string) => {
        fetchTest(id)
        setCurrentTestId(id)
        setCurrentTestTitle(title)
    }


    if (!testsList.length) {
        return <LoadingDots />
    }

    const tests = testsList.map((test, i) => {

        return <div key={i}>
            <div className={c.row} onClick={() => chooseTest(test.id, test.title)} >
                {test.title}
            </div>
        </div>
    })

    if (!questions.length) {
        return <div className={c.wrap}>
            {tests}
        </div >
    } else {
        return <Test currentTestTitle={currentTestTitle}
            currentTestId={currentTestId}
            questions={questions} />

    }


}