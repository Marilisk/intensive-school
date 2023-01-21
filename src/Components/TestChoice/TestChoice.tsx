import { FC, useEffect, useCallback } from "react";
import { instance } from "../../api/api";
import { TestListItemType } from "../../App";
import c from './TestChoice.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
//import { testHardcoredValues } from "./testsNumbers";


interface ITestChoice {
    setTestsList: any
    testsList: TestListItemType[]
}


export const TestChoice: FC<ITestChoice> = ({ setTestsList, testsList }: ITestChoice) => {
    const navigate = useNavigate()

    const memoisedFetchTestList = useCallback(async () => {
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
        //fetchTestList()
        memoisedFetchTestList()
        //setTestsList(testHardcoredValues)
    }, [memoisedFetchTestList])

    useEffect(() => {
        if (!localStorage.getItem('fio') && !localStorage.getItem('phone') && !localStorage.getItem('email')) {
            navigate('/')
        }
    })

    if (!testsList.length) {
        return <div>Loading ...</div>
    }

    const tests = testsList.map((test, i) => {

        return <div key={i}>

            <div className={c.row}>
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