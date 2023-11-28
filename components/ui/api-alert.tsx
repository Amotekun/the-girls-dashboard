import { 
    Alert, 
    AlertDescription, 
    AlertTitle 
} from "@/components/ui/alert"

import { Copy, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { Badge, BadgeProps } from "./badge"

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";

}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
}

const variantmap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}

export const ApiAlert = ({
    title,
    description,
    variant="public"
}: ApiAlertProps) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied successfully to clipboard")
    }

    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center justify-between">
                {title}
                <Badge variant={variantmap[variant]}> 
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between ">
                <code>
                    {description}
                </code>
                <Button
                    variant = "outline"
                    size = "icon"
                    onClick = {onCopy}
                >
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}