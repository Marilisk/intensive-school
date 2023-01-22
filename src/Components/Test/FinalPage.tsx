import { FC } from "react";
import c from './Test.module.scss';
import { useNavigate } from 'react-router-dom';

interface IFinalPage {
    scoreSum: number
    questionsAmount: number
    currentTestTitle: string
    testId?: string
    increaseStep: (arg: number) => void
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, questionsAmount, currentTestTitle, testId, increaseStep }: IFinalPage) => {
    const navigate = useNavigate();
    const date = localStorage.getItem(`${currentTestTitle} пройден`);

    const reStartTest = () => {
        localStorage.removeItem(`${currentTestTitle} шаг`)
        increaseStep(0)
        navigate(`/test/${testId}`)
    }

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