import { useState } from 'react';
import c from './App.module.scss';
import { Routes, Route, NavLink } from 'react-router-dom';
import { AuthVisitor } from './Components/AuthVisitor/AuthVisitor';
import { TestChoice } from './Components/TestChoice/TestChoice';
import { Test } from './Components/Test/Test';
import { TestListItemType } from './types';
 

function App() {

  const [authState, setAuthState] = useState({ fio: '', phone: '', email: '', })
  const [testsList, setTestsList] = useState<TestListItemType[]>([])
  const [currentTestTitle, setCurrentTestTitle] = useState('')

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

        <Route path='/' element={<AuthVisitor authState={authState} setAuthState={setAuthState} />} />

        <Route path='/testchoice' element={<TestChoice setTestsList={setTestsList} 
                                                      testsList={testsList}
                                                      setCurrentTestTitle={setCurrentTestTitle} />} />

        <Route path='/test/:id' element={<Test currentTestTitle={currentTestTitle}
                                                /* setCurrentTestTitle={setCurrentTestTitle} */ />} />
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
