import { FC, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthType } from "../../App";
import c from './AuthVisitor.module.scss';
import arrow from './../assets/images/arrow.png'


export interface IAuthVisitor {
    authState: AuthType
    setAuthState: (arg: AuthType) => void
}


export const AuthVisitor: FC<IAuthVisitor> = ({ authState, setAuthState }: IAuthVisitor) => {
    const navigate = useNavigate()

    const isAuthFormFilled = Boolean(authState.fio && authState.email && authState.phone)

    const handleSubmit = () => {
        console.log(authState)
        localStorage.setItem('fio', authState.fio)
        localStorage.setItem('phone', authState.phone)
        localStorage.setItem('email', authState.email)
        setAuthState({ fio: '', phone: '', email: '', })
        navigate('/testchoice')

    }

    useEffect( () => {
        if (localStorage.getItem('fio') && localStorage.getItem('phone') && localStorage.getItem('email')) {
            navigate('/testchoice')
        }
    })

    return <div className={c.wrap}>
        <form onSubmit={() => handleSubmit()}>

            <h2>Ваши данные:</h2>
            <div className={c.formRow}>

                <label>
                    <span>ФИО:</span>
                    <input value={authState.fio}
                        type="text" placeholder="фамилия имя отчество"
                        onChange={e => setAuthState({ ...authState, fio: e.target.value })} />
                </label>
            </div>

            <div className={c.formRow}>
                <label>
                    <span>Телефон:</span>
                    <input value={authState.phone}
                        type="text" placeholder="телефон"
                        onChange={e => setAuthState({ ...authState, phone: e.target.value })} />
                </label>
            </div>

            <div className={c.formRow}>
                <label>
                    <span>Email:</span>
                    <input value={authState.email}
                        type="text" placeholder="email"
                        onChange={e => setAuthState({ ...authState, email: e.target.value })} />
                </label>
            </div>

            <div className={c.formRow}>
                <button type="submit" disabled={!isAuthFormFilled}>
                    <div className={c.firstPart}>Далее</div>
                    <div className={c.imgWrap}>
                        <img alt='' src={arrow} />
                    </div>
                </button>
            </div>
        </form>


    </div >

}