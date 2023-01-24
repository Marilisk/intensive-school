import { FC, useEffect } from "react";
import c from './TestChoice.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import { TestListItemType } from "../../types";

interface ITestChoice {
    testsList: TestListItemType[]
}

export const TestChoice: FC<ITestChoice> = ({ testsList }: ITestChoice) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('fio') && (!localStorage.getItem('phone') || !localStorage.getItem('email'))) {
            navigate('/test/authform')
        }
    })

    if (!testsList.length) {
        return <LoadingDots />
    }

    const tests = testsList.map((test, i) => {

        return <div key={i}>
            <div className={c.row} >
                <Link to={`/test/test/${test.id}`}>
                    {test.title}
                </Link>
            </div>
        </div>
    })

    return <div className={c.wrap}>   
        {tests}
    </div >

}