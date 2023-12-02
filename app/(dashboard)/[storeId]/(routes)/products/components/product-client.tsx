"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ProductClienrProps {
    data: ProductColumn[]
}
const ProductClient: React.FC<ProductClienrProps> = ({
    data
}) => {

    const params = useParams();
    const router = useRouter();


    const onRedirect = () => {
        router.push(`/${params.storeId}/products/new`)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Products (${data.length})`}
                    description="This is a list of products"
                />
                <Button 
                    onClick={onRedirect}
                >
                    Add Product
                </Button>
            </div>
            <Separator />
            <DataTable 
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Separator />
            <Heading 
                title="API List"
                description="This is a list of product API"
            />
            <ApiList 
                entityName="products"
                entityIdName="productId"
            />
        </>
    )
}

export default ProductClient;