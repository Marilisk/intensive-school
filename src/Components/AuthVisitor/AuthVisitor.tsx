import { FC, useState } from "react";
import { useNavigate } from 'react-router-dom';
import c from './AuthVisitor.module.scss';



export const AuthVisitor: FC = () => {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState({ fio: '', phone: '', email: '', })

    const handleSubmit = () => {

        console.log(authState)
        localStorage.fio = authState.fio
        localStorage.phone = authState.phone
        localStorage.email = authState.email

        setAuthState({fio: '', phone: '', email: '',})
        navigate('/testchoice')

    }

    return <div className={c.wrap}>
        <form onSubmit={() => handleSubmit() }>
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
            <button type="submit">
                Далее
            </button>
        </div>
        </form>


    </div >

}