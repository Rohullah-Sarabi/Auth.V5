"use server"

import { generateVerificationToken } from "@/data/tokens"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { SettingsSchema } from "@/schemas"
import { existsSync } from "fs"
import * as z from "zod"
import bcrypt from "bcryptjs"

export const settings = async(values:z.infer<typeof SettingsSchema>)=>{
    const user = await currentUser();

    if(!user){
        return{error:"Unauthorized"}
    }

    const dbUser = await getUserById(user.id)
    if(!dbUser){
        return {error:"Unauthorized"}
    }

    if(user.isOAuth){
        values.email =undefined;
        values.password= undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled=undefined
    }

    if(values.email && values.email !==user.email){
        const existingUser = await getUserByEmail( values.email)
        if(existingUser|| existingUser.id!==user.id){
            return {errorL:"Email Already in use"}
        }
        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email,verificationToken.token)
        return {success:"ٰverification email send!"}
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch = await bcrypt.compare(values.password,dbUser.password)
        if(!passwordMatch){
            return {error:"Incorrect password!"}
        } 
        const hashPassword = await bcrypt.hash(values.newPassword,10)
        values.password = hashPassword
        values.newPassword = undefined
    }


    await db.user.update({
        where:{id:dbUser.id},
        data:{
            ...values
        }
    })

    return {success:"Settings Updated!"}
}