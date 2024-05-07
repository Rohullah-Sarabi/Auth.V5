"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";


export const newVerification = async (token: string) => {
    const existToken = await getVerificationTokenByToken(token);

    if (!existToken) {
        return { error: "Token does not exist!" }
    }

    const hasExpired = new Date(existToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired!" }

    const existingUser = await getUserByEmail(existToken.email);

    if (!existingUser) return { error: "Email does not exist!" }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingUser.email
        }
    });

    await db.verificationToken.delete({
        where:{id:existToken.id}
    })

    return {success:"Email verified!"}
}