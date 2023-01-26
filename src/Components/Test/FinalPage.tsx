import { FC } from "react";
import c from './Test.module.scss';

interface IFinalPage {
    scoreSum: number
    questionsAmount: number
    currentTestTitle: string
    currentTestId: string
    increaseStep: (arg: number) => void
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, questionsAmount, currentTestTitle, currentTestId, increaseStep }: IFinalPage) => {

    const date = localStorage.getItem(`${currentTestId}finished`);

    const reStartTest = () => {
        localStorage.removeItem(`step${currentTestId}`)
        localStorage.removeItem(`score${currentTestId}`)
        localStorage.removeItem(`test${currentTestId}begun`)
        increaseStep(0)
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

        <div onClick={() => reStartTest()} className={c.restartBtn}>
            Пройти заново
        </div>

    </div >

}