import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ColorColumn } from './columns'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import axios from 'axios'
import { AlertModal } from '@/components/modals/alert-modal'

interface CellActionProps {
    data: ColorColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // set a redirect variable here so you can use the refresh with the router
    const onRedirect = () => {
        router.push(`/${params.storeId}/colors/new`)
    }

    const onCopy =(id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Color Id copied successfully")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
            toast.success('color deleted')
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setOpen(false)
            setLoading(false) 
        }
    }
  return (
    <>
        <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm ={onDelete}
            loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className='h-8 w-8 p-0'
                >
                    <span className='sr-only'>Oen Menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => onCopy(data.id)}
                >
                    <Copy className="mr-2 w-4 h-4" />
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onRedirect}
                >
                    <Edit  className='h-4 w-4 mr-2'/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpen(true)}
                >
                    <Trash className='mr-2 w-4 h-4'/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>  
    </>
  )
}
