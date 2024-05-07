"use client"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const onClcik = (provider:"google"|"github")=>{
        signIn(provider,{
            callbackUrl:callbackUrl||DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="flex items-center w-full gap-x-2 ">
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => onClcik("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => onClcik("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}