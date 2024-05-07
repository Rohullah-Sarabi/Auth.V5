import { CardWrapper } from "./card-wrap";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLable="Oops! Something went wrong"
            backButtonLabel="Back to login"
            backButtonhref="/auth/login"
            showSocial={false}
            >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard;