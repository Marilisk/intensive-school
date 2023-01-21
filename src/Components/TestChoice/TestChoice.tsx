import { FC, useEffect } from "react";
import { instance } from "../../api/api";
import { TestListItemType } from "../../App";
import c from './TestChoice.module.scss';
import { NavLink } from 'react-router-dom';


interface ITestChoice {
    setTestsList: any
    testsList: TestListItemType[]
}


export const TestChoice: FC<ITestChoice> = ({ setTestsList, testsList }: ITestChoice) => {


    const fetchTestList = async () => {
        try {
            const response = await instance('')
            console.log(response.data)
            setTestsList(response.data.testsList)
        } catch (error) {
            console.log(error)
            alert('не удалось получить список тестов')
        }
    }

    useEffect(() => {
        fetchTestList()
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