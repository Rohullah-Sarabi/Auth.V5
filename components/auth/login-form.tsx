"use client"
import { CardWrapper } from "./card-wrap"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { Login } from "@/action/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email already in use with differen previoder!" : "";

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [ispendding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            Login(values,callbackUrl).then((data) => {
                if (data?.error) {
                    // form.reset();
                    console.log(data.error)
                    setError(data.error)
                }

                if (data?.success) {
                    // form.reset()
                    setSuccess(data.success)
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true)
                }
            }).catch((error) => {
                console.log(error)
                setError("Hello Man")
                // setError(error.message)
            })
        });
    }
    return (
        <div>
            <CardWrapper
                headerLable={"Welcome Back"}
                backButtonLabel={"Don`t have an account?"}
                backButtonhref={"/auth/register"}
                showSocial>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4 ">
                            {
                                showTwoFactor && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Two Factor Code</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={ispendding}
                                                            placeholder="1234..."
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                            {!showTwoFactor &&
                                <>
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
                                                <Button variant={"link"} size={"sm"} asChild className="px-0 font-normal">
                                                    <Link href={"/auth/reset"}>
                                                        Forgot password
                                                    </Link>
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            }
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error || urlError} />
                        <Button
                            disabled={ispendding}
                            type="submit"
                            className="w-full"
                        >
                            {showTwoFactor?"Confirm":"Login"}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}