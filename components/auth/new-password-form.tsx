"use client"
import { CardWrapper } from "./card-wrap"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { newPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { NewPassword } from "@/action/new-password";

export const NewpasswordForm = () => {

    const params = useSearchParams()
    const token = params.get("token")

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [ispendding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            NewPassword(values,token).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        });
    }
    return (
        <div>
            <CardWrapper
                headerLable={"Enter a New Password"}
                backButtonLabel={"Back to Login"}
                backButtonhref={"/auth/login"}
                showSocial={false}
                >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4 ">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={ispendding}
                                                placeholder="********"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button
                            disabled={ispendding}
                            type="submit"
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}