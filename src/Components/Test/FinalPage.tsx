import { FC, useEffect } from "react";
import c from './Test.module.scss';
import { useNavigate } from 'react-router-dom';

interface IFinalPage {
    scoreSum: number
    questionsAmount: number
    currentTestTitle: string
    currentTestId: string
    testId?: string
    increaseStep: (arg: number) => void
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, questionsAmount, currentTestTitle, currentTestId, testId, increaseStep }: IFinalPage) => {
    const navigate = useNavigate();
    const date = localStorage.getItem(`${currentTestId}finished`);

    const reStartTest = () => {
        localStorage.removeItem(`step${currentTestId}`)
        localStorage.removeItem(`score${currentTestId}`)
        increaseStep(0)
        navigate(`/test/test/${testId}`)
    }

    useEffect( () => {
        localStorage.removeItem(`test${currentTestId}begun`)
    }, [currentTestId])

    useEffect( () => {
        const result = JSON.stringify({
            name: localStorage.getItem('fio'),
            phone: localStorage.getItem('phone'),
            email: localStorage.getItem('email'),
            testId,
            testTitle: currentTestTitle,
            score: scoreSum,
        })
        return () => {
            console.log (result)   
            // сюда можно вписать нужный пост запрос для отправки результатов теста куда следует
            // и мне кажется можно положить в сторадж переменную - типа - отправлен результат

        }
    })

    return <div className={c.wrap}>
        <h2>
            <div>
                Поздравляем! Вы успешно прошли {currentTestTitle}
            </div>
        </h2>

        <div>
            <p>Дата тестирования {date} </p>
            <p>Результат {scoreSum} из {questionsAmount}</p>
        </div>

        <div onClick={() => reStartTest() } className={c.restartBtn}>
            Пройти заново
        </div>

    </div >

}