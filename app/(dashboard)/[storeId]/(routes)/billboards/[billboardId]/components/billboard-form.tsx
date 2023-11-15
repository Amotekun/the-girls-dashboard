"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z  from "zod"

interface BillboardFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardForm = z.infer<typeof formSchema>


const BillboardForm = ({
    initialData
}: BillboardFormProps) => {
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()

    const form = useForm<BillboardForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: "",
            imageUrl: "",
        }
    })

    const title = initialData ? "Edit Billboard" : "Create Billboard"
    const description = initialData ? "Edit Billboard" : "Create Billboard";
    const action = initialData ? "Save Changes" : "Create Billboard";
    const toastMessage = initialData ? "Billboard udated" : "Billboard created"

    const onSubmit = async (data: BillboardForm) => {
        try {
            setLoading(true)
            if(initialData) {

            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = () => {

    }
    
  return (
    <>
        <div className="">
            <Heading 
                title={title}
                description={description}

            />

        </div>
        <Form {...form}>
            <form 
                onSubmit={() => {}}
                className="space-y-8 w-full"
            >
                <FormField 
                    control={form.control}
                    name="imageUrl"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Background image</FormLabel>
                            <FormControl>
                                <ImageUpload 
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="Billbord label"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                >
                    {action}
                </Button>
            </form>

        </Form>
    </>
  )
}

export default BillboardForm