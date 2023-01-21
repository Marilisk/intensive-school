import React, { useState } from 'react';
import c from './App.module.scss';
import { Routes, Route, NavLink } from 'react-router-dom';
import { AuthVisitor } from './Components/AuthVisitor/AuthVisitor';
import { TestChoice } from './Components/TestChoice/TestChoice';
import { Test } from './Components/Test/Test';

export type TestListItemType = {
  id: number
  title: string
}


function App() {

  const [testsList, setTestsList] = useState<TestListItemType[]>([])


  return <>
    <div className={c.header}>
      <div>
        <h1>Тестирование</h1>
        <div>
          <NavLink to={'/'}>Все тесты</NavLink>
        </div>
      </div>
    </div>

    <div className={c.appWrapper}>
      <Routes>
        <Route path='/auth' element={<AuthVisitor />} />
        <Route path='/' element={<TestChoice setTestsList={setTestsList} testsList={testsList} />} />
        <Route path='/test/:id' element={<Test testsList={testsList} />} />
      </Routes>
    </div>
  </>
}

export default App;
