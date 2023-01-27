import { FC, useEffect } from "react";
import c from './Test.module.scss';

interface IFinalPage {
    scoreSum: number
    //questionsAmount: number
    currentTestTitle: string
    currentTestId: string
    increaseStep: (arg: number) => void
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, /* questionsAmount,  */currentTestTitle, currentTestId, increaseStep }: IFinalPage) => {

    const date = localStorage.getItem(`${currentTestId}finished`);

    const reStartTest = () => {
        localStorage.removeItem(`step${currentTestId}`)
        localStorage.removeItem(`score${currentTestId}`)
        localStorage.removeItem(`test${currentTestId}begun`)
        increaseStep(0)
    }

    useEffect(() => {
        localStorage.removeItem(`test${currentTestId}begun`)
    })


    return <div className={c.wrap}>

        <h2>
            <div>
                {currentTestTitle}
            </div>
        </h2>

        <div>
            <p>Дата тестирования {date}. <br />
                Поздравляем! Вы успешно прошли тестирование {currentTestTitle} <br />
                Результат {scoreSum} {/* из {questionsAmount} */}</p>
        </div>

        <div onClick={() => reStartTest()} className={c.restartBtn}>
            Пройти заново
        </div>

        <div className={c.bold}>
            <p>Данное тестирование является предварительным.<br />
                Рекомендуется прохождение устного тестирования с преподавателем в офисе для окончательного определения Вашего уровня.<br />
                <a href="https://intensiv.ru/reg2test/">Записаться на тестирование с преподавателем</a>
            </p>

        </div>

    </div>

}