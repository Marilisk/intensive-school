import { FC, useEffect, useState } from "react";
import { instance } from "../../api/api";
import { TestListItemType } from "../../App";
import c from './Test.module.scss';
import { useParams } from 'react-router-dom';


interface ITest {
    testsList: TestListItemType[]
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

export const Test: FC<ITest> = ({ testsList }: ITest) => {
    const params = useParams();
    const [questions, setQuestions] = useState<QuestionItemType[]>([])

    const fetchTest = async (id: string) => {
        try {
            const response = await instance(`/test/${id}/`)
            console.log(response)
            setQuestions(response.data.listQuestions)
        } catch (error) {
            console.log(error)
            alert('не удалось получить список вопросов')
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchTest(params.id)
        }
    }, [params.id])

    if (!questions.length) {
        return <div>Loading ...</div>
    }

    const question = questions.map((item, ind) => {

        return <div key={ind}>
            <div className={c.question}>
                <p>Вопрос {ind + 1} из {questions.length}:</p>
                {item.question}

                <div className={c.answerBlock}> 
                    <span>Ответ:</span>

                    <div>
                        {item.answers.map((variant, i) => {
                            return <div className={c.variant}>
                                <label>
                                    <input type='radio' value={variant.text} />
                                    {variant.text}
                                </label>
                            </div>
                        })}
                    </div>

                </div>
            </div>
        </div>
    })


    return <div className={c.wrap}>

        {question}

    </div >

}