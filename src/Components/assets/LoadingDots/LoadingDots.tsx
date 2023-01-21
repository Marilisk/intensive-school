import { FC } from "react";
import c from './LoadingDots.module.scss';



export const LoadingDots: FC = () => {

    return <div className={c.loader}>
        <span /> <span /> <span />
    </div>

}