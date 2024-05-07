"use client"
import { CardWrapper } from "./card-wrap"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useState, useTransition } from "react";
import { Reset } from "@/action/reset";


export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [ispendding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            Reset(values).then((data) => {
                setError(data?.error)
                // TODO: Add when we add 2fA
                setSuccess(data?.success)
            })
        });
    }
    return (
        <div>
            <CardWrapper
                headerLable={"Forgot your Password?"}
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={ispendding}
                                                placeholder="john.doe@gmail.com"
                                                type="email"
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
                            Send Reset Email
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}