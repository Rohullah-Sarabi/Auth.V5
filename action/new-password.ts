"use server"
import * as z from "zod"
import { newPasswordSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"

export const NewPassword = async(values:z.infer<typeof newPasswordSchema>,token?:string|null)=>{
    
    if(!token) return{error:"Missing Token!"}

    const validatedField = newPasswordSchema.safeParse(values)

    if(!validatedField.success){
        return {error:"Invalid fields!"}
    }

    const {password} = validatedField.data;
    const exisitingToken = await getPasswordResetTokenByToken(token)

    if(!exisitingToken) return {error:"Invalid token!"}

    const hasExpired = new Date(exisitingToken.expires)<new Date()
    if(hasExpired) return {error:"Token has expired!"}

    const existingUser = await getUserByEmail(exisitingToken.email);
    if(!existingUser) return {error:"Email does not exist!"}

    const hashedPassword = await bcrypt.hash(password,10)

    await db.user.update({
        where:{id:existingUser.id},
        data:{password:hashedPassword}
    })

    await db.passwordResetToken.delete({
        where:{id:exisitingToken.id}
    })

    return {success:"Password updated!"}
}