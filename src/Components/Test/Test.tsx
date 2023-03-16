import { FC, useEffect, useState } from "react";
import c from './Test.module.scss';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import arrow from './../assets/images/arrow.png'
import { QuestionItemType } from "../../types";
import { AuthVisitor } from "../AuthVisitor/AuthVisitor";

export interface ITestProps {
    currentTestTitle: string
    currentTestId: number
    questions: QuestionItemType[]
}

export const Test: FC<ITestProps> = ({ currentTestTitle, currentTestId, questions }: ITestProps) => {

    const [step, increaseStep] = useState<number>(0)
    const [answerScore, setAnswerScore] = useState<number | null>(null) // текущий выбранный ответ
    const [scoreSum, setScoreSum] = useState<number>(0) // сумма полученных баллов

    const radioChangeHandler = (score: number) => {
        setAnswerScore(score)
    }
    const goNext = () => {
        if (answerScore) {
            setScoreSum(prev => prev + 1)
            localStorage.setItem(`score${currentTestId}`, `${scoreSum + 1}`)
        }
        setAnswerScore(null)
        localStorage.setItem(`step${currentTestId}`, `${step + 1}`)
        increaseStep(prev => prev + 1)
    }

    useEffect(() => {
        let wasStarted = localStorage.getItem(`test${currentTestId}begun`)
        if (wasStarted) {
            increaseStep(Number(localStorage.getItem(`step${currentTestId}`)) || 0)
            setScoreSum(Number(localStorage.getItem(`score${currentTestId}`)))
        }
    }, [step, questions.length, currentTestId])

    useEffect(() => {
        if (!localStorage.getItem(`test${currentTestId}begun`) && currentTestId) {
            localStorage.setItem(`test${currentTestId}begun`, 'true')
        }
    }, [currentTestId])


    if (!questions.length || !currentTestId) {
        return <LoadingDots />
    } else if (step === questions.length) {
        return <AuthVisitor scoreSum={scoreSum}
            currentTestTitle={currentTestTitle}
            currentTestId={String(currentTestId)}
            increaseStep={increaseStep}
            questions={questions}
        />
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
        <h2>{currentTestTitle} </h2>
        <div>

            <p>Вопрос {step + 1} из {questions.length}:</p>
            {currentQuestion.question}
            {currentQuestion.image && <img alt='' className={c.qImg} src={`https://intensiv.ru${currentQuestion.image}`} />}

        </div>

        <div className={c.answerBlock}>
            <span>Ответ:</span>
            <div>
                {answerVariants}

                <button onClick={() => goNext()} >
                    <div className={c.firstPart}>Далее</div>
                    <div className={c.imgWrap}>
                        <img alt='' src={arrow} />
                    </div>
                </button>

            </div>
        </div>
    </div >

}