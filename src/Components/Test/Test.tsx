import React, { FC, useEffect, useState } from "react";
import { API_URL, instance } from "../../api/api";
import { TestListItemType } from "../../App";
import c from './Test.module.scss';
import { useParams } from 'react-router-dom';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import arrow from './../assets/images/arrow.png'


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
    const [step, increaseStep] = useState<number>(0)
    const [answerScore, setAnswerScore] = useState<number | null>(null)
    const [scoreSum, setScoreSum] = useState<number>(0)
    const [final, setIsFinal] = useState<boolean>(false)


    const radioChangeHandler = (score: number, e:React.FormEvent) => {
        //e.preventDefault()
        e.stopPropagation()
        setAnswerScore(score)
        console.log(score)
    }

    const goNext = () => {
        //console.log('answerScore ', answerScore)
        if (answerScore) {
            setScoreSum(scoreSum + answerScore)
            console.log('scoreSum increased')
        }
        //console.log('scoreSum ', scoreSum)

        setAnswerScore(null)
        if (step > questions.length - 1) {
            setIsFinal(true)
        }
        increaseStep(prev => prev + 1)
    }

    const fetchTest = async (id: string) => {
        try {
            const response = await instance(`/test/${id}/`);
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
        return <LoadingDots />
    } else if (final) {
        return <div>Конец!</div>
    }

    const currentQuestion = questions[step];
    if (!currentQuestion) {
        return <div>Конец!</div>
    }
    const answerVariants = currentQuestion.answers.map((variant, i) => {
        return <div key={i} className={c.variant}>
            <label>
                <input type='radio'
                    name={currentQuestion.question}
                    value={variant.text}
                    key={`${currentQuestion.question}${i}`}
                    onChange={(e) => radioChangeHandler(variant.score, e)} />
                {variant.text}
            </label>
        </div>
    })

    return <div className={c.wrap}>
        <div>
            <p>Вопрос {step + 1} из {questions.length}:</p>
            {currentQuestion.question}
            {currentQuestion.image && 
                <img alt='' src={`${API_URL}/${currentQuestion.image}`}></img>}
        </div>

        <div className={c.answerBlock}>
            <span>Ответ:</span>
            <div>

                {answerVariants}

                <button onClick={() => goNext()}>
                    <div className={c.firstPart}>Далее</div>
                    <div className={c.imgWrap}>
                        <img alt='' src={arrow} />
                    </div>
                </button>
            </div>
        </div>
    </div >

}