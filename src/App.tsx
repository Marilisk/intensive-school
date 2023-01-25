import { useState, useCallback, useEffect } from 'react';
import c from './App.module.scss';
import { AuthVisitor } from './Components/AuthVisitor/AuthVisitor';
import { QuestionItemType, TestListItemType } from './types';
import { instance } from './api/api';


function App() {

  const [authState, setAuthState] = useState({ fio: '', phone: '', email: '', })
  const [testsList, setTestsList] = useState<TestListItemType[]>([])
  const [questions, setQuestions] = useState<QuestionItemType[]>([])


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
        <div className={c.chooseBtn} onClick={() => setQuestions([]) }>
            Выбрать тест
        </div>
      </div>
    </div>

    <div className={c.appWrapper}>

    <AuthVisitor authState={authState} 
                  setAuthState={setAuthState} 
                  testsList={testsList}
                  questions={questions}
                  setQuestions={setQuestions} />

    </div>

    <div className={c.footer}>
      <div>
        <div>
          <a href='https://intensiv.ru/'>
            © Образовательный центр «Интенсив», 2000 - 2023
          </a>
        </div>
      </div>
    </div>
  </>
}

export default App;
