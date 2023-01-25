import axios from "axios";
import { FC, useEffect } from "react";
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


    useEffect(() => {
        const result = JSON.stringify({
            name: localStorage.getItem('fio'),
            phone: localStorage.getItem('phone'),
            email: localStorage.getItem('email'),
            testId: currentTestId,
            testTitle: currentTestTitle,
            score: scoreSum,
        })

        axios({
            method: 'post',
            url: 'https://intensiv.ru/system/testresult.php',
            headers: {
                /* 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', */
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: result
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        //localStorage.setItem(`result_of_test${currentTestId}send`, String(date))

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

        <div onClick={() => reStartTest()} className={c.restartBtn}>
            Пройти заново
        </div>

    </div >

}