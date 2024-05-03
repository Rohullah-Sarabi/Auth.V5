"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const Register = async(values:z.infer<typeof RegisterSchema>)=>{
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success){
        return{error:"Invalid fields!"}
    }
    const {email,password,name} = validateFields.data
    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser = await getUserByEmail(email)
    console.log("Existing User:",existingUser)
    if(existingUser){
        return {error:"Email already in use!"};
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    });
    // TODO: Send verification token email
    return {success:"User created successfully!"}
}