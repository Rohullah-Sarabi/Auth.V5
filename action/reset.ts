"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/data/tokens"
import { SendPasswordResendEmail } from "@/lib/mail"


export const Reset = async(values:z.infer<typeof ResetSchema>)=>{
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return{error:"Invalid email!"}
    }
    const {email} = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if(!existingUser){
        return {error:"Email not Found!"}
    }
    const passwordResetToken = await generatePasswordResetToken(email)
    await SendPasswordResendEmail(passwordResetToken.email,passwordResetToken.token)
    return {success:"Reset email sent!"}
}