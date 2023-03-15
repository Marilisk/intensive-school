import axios from "axios";
import { FC, useEffect } from "react";
import c from './Test.module.scss';

interface IFinalPage {
    scoreSum: number
    currentTestTitle: string
    currentTestId: string
    increaseStep: (arg: number) => void
}

export const FinalPage: FC<IFinalPage> = ({ scoreSum, currentTestTitle, currentTestId, increaseStep }: IFinalPage) => {

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

    useEffect(() => {
        let data = new FormData();
        data.append('user_f_1', localStorage.getItem('phone') || '');
        data.append('user_f_2', localStorage.getItem('email') || '');
        data.append('user_f_3', currentTestTitle);
        data.append('user_f_4', String(scoreSum) || '0');
        data.append('pl_plugin_ident', '756b7e381866fa63122100dd87543d6c');
        data.append('p_title', localStorage.getItem('fio') || '');

        var config = {
            method: 'post',
            url: 'https://intensiv.ru/testing/form.php',
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [currentTestTitle, scoreSum])


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