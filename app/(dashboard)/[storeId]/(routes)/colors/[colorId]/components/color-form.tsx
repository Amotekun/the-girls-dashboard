"use client"

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


interface ColorFormProps {
    initialData: Color | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: "String must contain a valid hex code"
    })
})

type ColorFormValues = z.infer<typeof formSchema>

const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        }
    });
    const router = useRouter();
    const params = useParams();

    const [loading, setloading] = useState(false)
    const [open, setOpen] = useState(false)

    const action = initialData ? "Update color" : "Create color";
    const toastMessage = initialData ? "ColorUpdated" : "Color created";
    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Make changes to color" : "Add a new color"

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setloading(true) 
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)

            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`);
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setloading(false)
        }
    }
    const onDelete = async () => {
        try {
            setloading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`);
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setloading(false)
        }
    }


    return (
        <>
            <AlertModal
                 isOpen={open}
                 onClose={() => setOpen(false)}
                 onConfirm={onDelete}
                 loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading 
                    title={title}
                    description={description}
                />
                { initialData && (
                    <Button
                        onClick={onDelete}
                        variant="destructive"
                        size="icon"
                        disabled={loading}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel> Name </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled = {loading}
                                            placeholder = "Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>     
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Value </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input 
                                                disabled = {loading}
                                                placeholder = "Color value"
                                                {...field}
                                            />
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{ backgroundColor: field.value}}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled = {loading}
                        type = "submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default ColorForm;