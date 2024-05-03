import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface cardWrapperProps {
    children: React.ReactNode;
    headerLable: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSocial: boolean;

}

export const CardWrapper = ({ children, headerLable, backButtonhref, backButtonLabel, showSocial }: cardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLable} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocial &&(
                    <CardFooter>
                        <Social/>
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonhref}/>
            </CardFooter>
        </Card>
    )
}