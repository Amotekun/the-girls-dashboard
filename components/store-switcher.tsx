"use client"

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput,
    CommandItem,
    CommandList, 
    CommandSeparator
} from "./ui/command"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useStoreModal } from "@/hooks/use-store-modal"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {

    const params = useParams();
    const router = useRouter();
    const storeModal = useStoreModal();
    const [open, setOpen] = useState(false)

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    const currentStore = formattedItems.find((item) => item.value === params.storeId)



    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                >
                    <StoreIcon />
                    <ChevronsUpDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>No Stores found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    className="text-sm"
                                    onSelect={() => {onStoreSelect(store)}}
                                >
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check 
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value ? "opacity-100" : "opacity-0" 
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()

                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}