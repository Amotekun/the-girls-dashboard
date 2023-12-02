"use client"

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ProductPageProps {
    initialData: Product  & {
        images: Image[];
    } | null
    categories: Category[];
    sizes: Size[];
    colors: Color[];
}

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({url: z.string()}).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues  = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductPageProps> = ( {
    categories,
    sizes,
    colors,
    initialData,
}) => {

    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const action = initialData ? "Edit product" : "Create product";
    const toastMessage = initialData ? "Product updated" : "Product created";
    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit your existing product" : "Create your new product"
    

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price:parseFloat(String(initialData?.price))
        } : {
            name: "",
            images: [],
            price: 0,
            categoryId: "",
            colorId: "",
            sizeId: "",
            isFeatured: false,
            isArchived: false,
        }
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {

            } else {
                await axios.post(`/api/${params.storeId}/products`, data)
            }
            router.refresh();
            router.push(`/${params.storeId}/products`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.push(`/${params.storeId}/products`);
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <> 
            <AlertModal 
                isOpen = {open}
                onClose={() => {setOpen(false)}}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-center text-center space-x-20">
                <Heading 
                    title = {title}
                    description = {description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField 
                        control = {form.control}
                        name = "images"
                        render = {({ field }) => (
                            <FormItem className="mb-8">
                                <FormLabel>
                                    Images
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map((image) => image.url)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, {url}])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <FormField 
                            control = {form.control}
                            name = "name"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading}
                                            placeholder = "Product Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control = {form.control}
                            name = "price"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Price
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled = {loading}
                                            placeholder= "0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name = "categoryId"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Category
                                    </FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue = {field.value}
                                                    placeholder = "select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control = {form.control}
                            name = "sizeId"
                            render = {({ field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Size
                                    </FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue = {field.value}
                                                    placeholder = "select a size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem
                                                    key={size.id}
                                                    value={size.id}
                                                >
                                                    {size.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}                 
                        />

                        <FormField 
                            control = {form.control}
                            name = "colorId"
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Color
                                    </FormLabel>
                                    <Select
                                        disabled = {loading}
                                        onValueChange = {field.onChange}
                                        value = {field.value}
                                        defaultValue = {field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue = {field.value}
                                                    placeholder = "select a color"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key = {color.id}
                                                    value = {color.id}
                                                >
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control = {form.control}
                            name = "isFeatured"
                            render = {({ field }) => (
                                <FormItem className="border p-2 rounded-md">
                                    <FormControl>
                                        <Checkbox 
                                            checked = {field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div>
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear in the featured section, which is your home page by default. 
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="border p-2 rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            checked ={field.value}
                                            onCheckedChange = {field.onChange}
                                        />
                                    </FormControl>
                                    <div>
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>
                                            This product will be archived and will not appear in your store
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        className="ml-auto"
                        disabled = {loading}
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default ProductForm;