import { Button } from "@/components/ui/button";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import { 
    Copy, 
    Edit, 
    MoreHorizontal, 
    Trash 
} from "lucide-react"
import { BillboardColumn } from "./columns";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";

interface CellActionProps {
    data: BillboardColumn
};

export const CellAction = ({
    data
}: CellActionProps) => {

    const router = useRouter();
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(data.id)
        toast.success("Billboard Id copied successfully")
    }

    const OnDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard Id deleted successfully")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    
    return (
        <>
            <AlertModal 
                isOpen= {open}
                onClose = {() => setOpen(false)}
                loading = {loading}
                onConfirm={OnDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className='h-4 w-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}