import { db } from "@/lib/db"

export const getPasswordResetTokenByToken = async(token:string)=>{
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where:{token}
        })
        return passwordResetToken;
    } catch (error) {
        return null
    }
}



export const getPasswordResetTokenByEmail = async(email:string)=>{
    try {
        const passwordResetEmail = await db.passwordResetToken.findFirst({
            where:{email}
        })
        return passwordResetEmail;
    } catch (error) {
        return null
    }
}
