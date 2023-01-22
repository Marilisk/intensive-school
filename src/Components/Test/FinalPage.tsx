import { FC } from "react";
import c from './Test.module.scss';
import { useNavigate } from 'react-router-dom';

interface IFinalPage {
    scoreSum: number
    questionsAmount: number
    currentTestTitle: string
    testId?: string
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, questionsAmount, currentTestTitle, testId }: IFinalPage) => {
    const navigate = useNavigate();
    const date = localStorage.getItem(`${currentTestTitle} пройден`) || 'неизвестно';

    const reStartTest = () => {
        localStorage.removeItem(`${currentTestTitle} шаг`)
        navigate(`/test/${testId}`)
    }

    return <div className={c.wrap}>
        <h2>
            <div>
                Поздравляем! Вы успешно прошли тестирование "{currentTestTitle}"
            </div>
            <div>

            </div>
        </h2>

        <div>
            <p>Дата тестирования {date} </p>
            <p>Результат {scoreSum} из {questionsAmount}</p>
        </div>

        <div onClick={() => reStartTest() }>Пройти заново</div>

    </div >

}