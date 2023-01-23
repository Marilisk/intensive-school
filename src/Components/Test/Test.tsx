import React, { FC, useEffect, useState } from "react";
import { instance } from "../../api/api";
import c from './Test.module.scss';
import { useParams } from 'react-router-dom';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import arrow from './../assets/images/arrow.png'
import { ITest, QuestionItemType } from "../../types";
import { FinalPage } from "./FinalPage";


export const Test: FC<ITest> = ({ testsList }: ITest) => {
    const params = useParams();
    const [currentTestTitle, setCurrentTestTitle] = useState('')
    const [questions, setQuestions] = useState<QuestionItemType[]>([])
    const [step, increaseStep] = useState<number>(0)
    const [answerScore, setAnswerScore] = useState<number | null>(null) // текущий выбранный ответ
    const [scoreSum, setScoreSum] = useState<number>(0) // сумма полученных баллов
    
    const radioChangeHandler = (score: number, e: React.FormEvent) => {
        setAnswerScore(score)
    }
    
    const goNext = () => {
        if (answerScore) {
            setScoreSum(scoreSum + answerScore)
            console.log('scoreSum increased')
        }
        setAnswerScore(null)
        if (step === questions.length-1) {
            let date = new Date()
            let month = (date.getMonth()+1) < 10 ?  `0${date.getMonth()+1}` : (date.getMonth()+1);
            localStorage.setItem(`${currentTestTitle} пройден`, `${date.getDate()}.${month}.${date.getFullYear()}`)
                                  
        }
        localStorage.setItem(`${currentTestTitle} шаг`, `${step + 1}`)
        localStorage.setItem(`Баллы, ${currentTestTitle}`, `${scoreSum}`)
        increaseStep(prev => prev + 1)
    }

    const fetchTest = async (id: string) => {
        try {
            const response = await instance(`/test/${id}/`);
            setQuestions(response.data.listQuestions)
        } catch (error) {
            console.log(error)
            alert('не удалось получить список вопросов')
        }
    }
    useEffect(() => {
        if (params.id) {
            fetchTest(params.id)
            const test = testsList.find(el => el.id === Number(params.id))
            if (test) {setCurrentTestTitle(test.title)}
        }
    }, [params.id, testsList])

    useEffect(() => {
        let wasStarted = localStorage.getItem(`${currentTestTitle} шаг`)
        if (wasStarted) {
            increaseStep(Number(wasStarted))
            setScoreSum(Number(localStorage.getItem(`Баллы, ${currentTestTitle}`)))
        }
    }, [currentTestTitle, step, questions.length])


    if (!questions.length) {
        return <LoadingDots />
    } else if (step === questions.length ) {
        return <FinalPage scoreSum={scoreSum} 
                            questionsAmount={questions.length}
                            currentTestTitle={currentTestTitle}
                            testId={params.id}
                            increaseStep={increaseStep} />  
    }

    const currentQuestion = questions[step];

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

    /* if (!currentQuestion) {
        return <div>Конец!</div>
    } */

    return <div className={c.wrap}>
        <h2>{currentTestTitle}</h2> 
        <div>
            <p>Вопрос {step + 1} из {questions.length}:</p>
            {currentQuestion.question}
            {currentQuestion.image && <img alt='' className={c.qImg} src={`https://intensiv.ru${currentQuestion.image}`} />}
        </div>

        <div className={c.answerBlock}>
            <span>Ответ:</span>
            <div>
                {answerVariants}

                <button onClick={() => goNext()}
                    disabled={answerScore === null} >
                    <div className={c.firstPart}>Далее</div>
                    <div className={c.imgWrap}>
                        <img alt='' src={arrow} />
                    </div>
                </button>

            </div>
        </div>
    </div >

}