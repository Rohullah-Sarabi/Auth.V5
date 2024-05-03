"use client"
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2 ">
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => console.log("Google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => console.log("Google")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}