import { FC, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthType } from "../../App";
import c from './AuthVisitor.module.scss';
import arrow from './../assets/images/arrow.png'
import { errors, validateEmail, validateFio, validatePhone } from "./authValidate";


export interface IAuthVisitor {
    authState: AuthType
    setAuthState: (arg: AuthType) => void
}

export const AuthVisitor: FC<IAuthVisitor> = ({ authState, setAuthState }: IAuthVisitor) => {
    const navigate = useNavigate()
    
    const handleSubmit = () => {
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

    /* const phoneMask = (phone:string) => {
        return phone.match(/[+]{0,1}[ \-0-9]{7,13}/gm);
    } */

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
                        }}/>
                {errors.fio && <div className={c.errorMsg}>{errors.fio}</div>}

                </label>
            </div>

            <div className={c.formRow}>
                <label>
                    <span>Телефон * :</span>
                    <input value={authState.phone}
                        type="tel" placeholder="телефон"
                        onChange={e => {
                            setAuthState({ ...authState, phone: e.target.value })
                            /* if (maskedPhone != null) {
                                errors.fio = validateFio(e.target.value)
                            }  */
                            errors.phone = validatePhone(e.target.value)                      
                        }}/>
                    {errors.phone && <div className={c.errorMsg}>{errors.phone}</div>}
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
                <button type="submit" disabled={Boolean(errors.email && errors.fio && authState.phone.length)}>
                    <div className={c.firstPart}>Далее</div>
                    <div className={c.imgWrap}>
                        <img alt='' src={arrow} />
                    </div>
                </button>
            </div>
        </form>


    </div >

}