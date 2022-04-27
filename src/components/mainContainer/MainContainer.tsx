import s from "styles/mainContainer/mainContainer.module.css"
import {ReactNode} from "react";

export const MainContainer = ({children}: MainContainerPropsType) => {
    return <div className={s.container}>{children}</div>
}

type MainContainerPropsType = {
    children: ReactNode
}