"use client"
import { CardWrapper } from "./card-wrap"
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
export const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token!")
            return;
        }
        newVerification(token).then((data) => {
            setSuccess(data.success)
            setError(data.error)
        }).catch((error) => {
            console.log(error.message)
            setError("Something went wrong!")
        })
    }, [ token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    return (
        <CardWrapper
            headerLable="Confirming your Verification"
            backButtonLabel="Back to login"
            backButtonhref="/auth/login"
            showSocial={false}        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (

                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (

                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}