import { useState, useCallback, useEffect } from 'react';
import c from './App.module.scss';
import { QuestionItemType, TestListItemType } from './types';
import { instance } from './api/api';
import { TestChoice } from './Components/TestChoice/TestChoice';


function App() {

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
        <div className={c.chooseBtn} onClick={() => setQuestions([])}>
          Выбрать тест
        </div>
      </div>
    </div>

    <div className={c.appWrapper}>

      <TestChoice testsList={testsList} setQuestions={setQuestions} questions={questions} />

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
