
import crypto from "crypto";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "./password-reset-token";
import { getTwoFactorTokenByEmail, getTwoFactorTokenByToken } from "./two-factor-token";

export const generateTwoFactorToken = async(email:string)=>{
    const token = crypto.randomInt(100_00,1_000_000).toString()
    const expires = new Date(new Date().getTime()+(5*60*1000))

    const existingToken = await getTwoFactorTokenByEmail(email)
    if(existingToken){
        await db.twoFactorToken.delete({
            where:{
                id:existingToken.id 
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data:{email,token,expires}
    })

    return twoFactorToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + (3600 * 1000))

    const exisitingToken = await getVerificationTokenByEmail(email)

    if (exisitingToken) {
        await db.verificationToken.delete({ where: { id: exisitingToken.id } })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email, token, expires
        }
    })

    return verificationToken;
}

export const generatePasswordResetToken = async (email:string)=>{
    const token = uuid()
    const expires = new Date(new Date().getTime() + (3600 * 1000))
    const exisitingToken = await getPasswordResetTokenByEmail(token)

    if(exisitingToken){
        await db.passwordResetToken.delete({
            where:{id:exisitingToken.id}
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,token,expires
        }
    });
    return passwordResetToken;
}