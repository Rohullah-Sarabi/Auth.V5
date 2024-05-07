"use client"

import { Logout } from "@/action/logout"

export const LogoutButton = ({children}:{children:React.ReactNode})=>{
    const onClick = ()=>{
        Logout()
    }

    return(
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    )
}