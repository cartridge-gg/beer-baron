import { ReactElement } from "react"

export const TextContainer = ({ children }: { children: ReactElement }) => {
    return <div className="p-2 rounded bg-dirt-100/10 flex">{children}</div>
}