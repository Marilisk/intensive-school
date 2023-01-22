import { FC, useEffect } from "react";
import c from './TestChoice.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingDots } from "../assets/LoadingDots/LoadingDots";
import { TestListItemType } from "../../types";

interface ITestChoice {
    //setTestsList: any
    testsList: TestListItemType[]
    //setCurrentTestTitle: (arg: string) => void
}

export const TestChoice: FC<ITestChoice> = ({ /* setTestsList, */ testsList }: ITestChoice) => {
    const navigate = useNavigate()

    /* const memoisedFetchTestList = useCallback(async () => {
        try {
            const response = await instance('')
            console.log(response.data)
            setTestsList(response.data.testsList)
        } catch (error) {
            console.log(error)
            alert('не удалось получить список тестов')
        }
    }, [setTestsList] )

    useEffect(() => {
        memoisedFetchTestList()
    }, [memoisedFetchTestList]) */

    useEffect(() => {
        if (!localStorage.getItem('fio') && (!localStorage.getItem('phone') || !localStorage.getItem('email'))) {
            navigate('/authform')
        }
    })

    if (!testsList.length) {
        return <LoadingDots />
    }

    const tests = testsList.map((test, i) => {

        return <div key={i}>

            <div className={c.row} /* onClick={() => setCurrentTestTitle(test.title)} */>
                <NavLink to={`/test/${test.id}`}>
                    {test.title}
                </NavLink>
            </div>
        </div>
    })

    return <div className={c.wrap}>   
        {tests}
    </div >

}