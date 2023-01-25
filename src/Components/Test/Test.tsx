import React, { FC, useEffect, useState } from "react";
//import { instance } from "../../api/api";
import c from './Test.module.scss';
import { useParams } from 'react-router-dom';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import arrow from './../assets/images/arrow.png'
import { ITest } from "../../types";
import { FinalPage } from "./FinalPage";


export const Test: FC<ITest> = ({ currentTestTitle, currentTestId, questions }: ITest) => {
    const params = useParams();
    const [step, increaseStep] = useState<number>(0)
    const [answerScore, setAnswerScore] = useState<number | null>(null) // текущий выбранный ответ
    const [scoreSum, setScoreSum] = useState<number>(0) // сумма полученных баллов

    
    const radioChangeHandler = (score: number) => {
        setAnswerScore(score)
    }
    const goNext = () => {
        if (answerScore) {
            setScoreSum(prev => prev + 1 )
            localStorage.setItem(`score${currentTestId}`, `${scoreSum + 1}`)
        }
        setAnswerScore(null)
        if (step === questions.length-1) {
            let date = new Date().toLocaleString('ru')
            localStorage.setItem(`${currentTestId}finished`, `${date}`)                      
        }
        localStorage.setItem(`step${currentTestId}`, `${step + 1}`)
        increaseStep(prev => prev + 1)
    }

    
    useEffect(() => {
        let wasStarted = localStorage.getItem(`test${currentTestId}begun`)
        if (wasStarted) {
            increaseStep( Number(localStorage.getItem(`step${currentTestId}`)) || 0)
            setScoreSum(Number(localStorage.getItem(`score${currentTestId}`)))
            localStorage.removeItem(`test${currentTestId}begun`)
        }
    }, [step, questions.length, currentTestId])

    useEffect(() => {
        if ( ! localStorage.getItem(`test${currentTestId}begun`) && currentTestId) {
            localStorage.setItem(`test${currentTestId}begun`, 'true')
        }
    }, [currentTestId])

 
    if (!questions.length || !currentTestId ) {
        return <LoadingDots />
    } else if (step === questions.length ) {
        return <FinalPage scoreSum={scoreSum} 
                            questionsAmount={questions.length}
                            currentTestTitle={currentTestTitle}
                            currentTestId={String(currentTestId)}
                            testId={params.id}
                            increaseStep={increaseStep} />  
    }

    const currentQuestion = questions[step];

    const answerVariants = currentQuestion.answers.map((variant, i) => {

        if (variant.text.startsWith('/images/')) {
            return <div key={i} className={c.variant}>
            <label>
                <input type='radio'
                    name={currentQuestion.question}
                    value={variant.text}
                    key={`${currentQuestion.question}${i}`}
                    onChange={() => radioChangeHandler(variant.score)} />
                <img alt='' src={`https://intensiv.ru${variant.text}`} />
            </label>
        </div>
        } else {
            return <div key={i} className={c.variant}>
            <label>
                <input type='radio'
                    name={currentQuestion.question}
                    value={variant.text}
                    key={`${currentQuestion.question}${i}`}
                    onChange={() => radioChangeHandler(variant.score)} />
                {variant.text}
            </label>
        </div>
        }
        
    })

    
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