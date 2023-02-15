import { FC, useState } from "react";
import InputMask from 'react-input-mask';
import c from './AuthVisitor.module.scss';
import arrow from './../assets/images/arrow.png'
import { errors, validateEmail, validateFio } from "./authValidate";
import { AuthType, QuestionItemType } from "../../types";
import { FinalPage } from "../Test/FinalPage";

export interface IAuthVisitorProps {
    scoreSum: number
    currentTestTitle: string
    currentTestId: string
    increaseStep: (arg: number) => void
    questions: QuestionItemType[]
}

export const AuthVisitor: FC<IAuthVisitorProps> = ({ scoreSum, currentTestTitle, currentTestId, increaseStep, questions }: IAuthVisitorProps) => {

    const [authState, setAuthState] = useState <AuthType>({ fio: '', phone: '', email: '', })

    const handleSubmit = () => {
        localStorage.setItem('fio', authState.fio)
        localStorage.setItem('phone', authState.phone)
        localStorage.setItem('email', authState.email)
        setAuthState({ fio: '', phone: '', email: '', })
    }

    let canGo = false;
    const isFioValidated = Boolean(authState.fio.length > 3)
    const isPhoneValidated = Boolean(authState.phone.length > 0) && !Boolean(authState.phone.includes('_'));
    const isEmailValidated = !Boolean(errors.email) && Boolean(authState.email.length > 0);
    canGo = isFioValidated && isPhoneValidated && isEmailValidated

    if ((localStorage.getItem('fio') &&
        (localStorage.getItem('phone') || localStorage.getItem('email')))) {
        return <FinalPage scoreSum={scoreSum} currentTestTitle={currentTestTitle}
            currentTestId={String(currentTestId)}
            increaseStep={increaseStep} />
    } else {
        return <div className={c.wrap}>
            <form onSubmit={() => handleSubmit()}>

                <h2>Ваши данные:</h2>
                <div className={c.formRow}>

                    <label>
                        <span>ФИО * :</span>
                        <input value={authState.fio}
                            type="text" placeholder="фамилия имя отчество"
                            onChange={e => {
                                setAuthState({ ...authState, fio: e.target.value })
                                errors.fio = validateFio(e.target.value)
                            }} />
                        {errors.fio && <div className={c.errorMsg}>{errors.fio}</div>}

                    </label>
                </div>

                <div className={c.formRow}>
                    <label>
                        <span>Телефон * :</span>
                        <InputMask mask='+7 (999) 999 99 99'
                            placeholder="телефон"
                            value={authState.phone}
                            onBlur={() => {
                                if (authState.phone.includes('_')) {
                                    setAuthState({ ...authState, phone: '' })
                                }
                            }}
                            onChange={e => setAuthState({ ...authState, phone: e.target.value })} />
                    </label>
                </div>

                <div className={c.formRow}>
                    <label>
                        <span>Email:</span>
                        <input value={authState.email}
                            type="text" placeholder="email"
                            onChange={e => {
                                setAuthState({ ...authState, email: e.target.value })
                                errors.email = validateEmail(e.target.value)
                            }} />
                        {errors.email && <div className={c.errorMsg}>{errors.email}</div>}

                    </label>
                </div>

                <div className={c.formRow}>
                    <button type="submit"
                        disabled={!canGo} >

                        <div className={c.firstPart}>Далее</div>
                        <div className={c.imgWrap}>
                            <img alt='' src={arrow} />
                        </div>
                    </button>
                </div>
            </form>


        </div >
    }



}