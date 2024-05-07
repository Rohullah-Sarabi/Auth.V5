import { db } from "@/lib/db";

export const getAccountByUserid = async(userid:string)=>{
    try {
        const account = await db.account.findFirst({
            where:{
                userId
            }
        })        
        return account
    } catch (error) {
        return null;
    }
} 