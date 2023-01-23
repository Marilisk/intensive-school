import { useState, useCallback, useEffect } from 'react';
import c from './App.module.scss';
import { Routes, Route, NavLink } from 'react-router-dom';
import { AuthVisitor } from './Components/AuthVisitor/AuthVisitor';
import { TestChoice } from './Components/TestChoice/TestChoice';
import { Test } from './Components/Test/Test';
import { TestListItemType } from './types';
import { instance } from './api/api';


function App() {

  const [authState, setAuthState] = useState({ fio: '', phone: '', email: '', })
  const [testsList, setTestsList] = useState<TestListItemType[]>([])

  const memoisedFetchTestList = useCallback(async () => {
    try {
      const response = await instance('')
      setTestsList(response.data.testsList)
    } catch (error) {
      console.log(error)
      alert('не удалось получить список тестов')
    }
  }, [setTestsList])

  useEffect(() => {
    memoisedFetchTestList()
  }, [memoisedFetchTestList])

  return <>
    <div className={c.header}>
      <div>
        <h1>Тестирование</h1>
        <div className={c.chooseBtn}>
          <NavLink to={'/'}>
            Выбрать тест
          </NavLink>
        </div>
      </div>
    </div>

    <div className={c.appWrapper}>
      <Routes>

        <Route path='/authform' element={<AuthVisitor authState={authState} setAuthState={setAuthState} />} />

        <Route path='/' element={<TestChoice testsList={testsList} />} />

        <Route path='/test/:id' element={<Test testsList={testsList} />} />

      </Routes>
    </div>

    <div className={c.footer}>
      <div>
        <div>
          <NavLink to={'/'}>© Образовательный центр «Интенсив», 2000 - 2023</NavLink>
        </div>
      </div>
    </div>
  </>
}

export default App;
