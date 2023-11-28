"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./columns";
import { Plus } from "lucide-react";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient = ({
    data
}: CategoryClientProps) => {
    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title = {`category(${data.length})`}
                    description = "Manage your business category"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/categories/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create new category
                </Button>
            </div>
            <Separator />
            {/* Data Table */}
            <DataTable 
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Separator />
            <Heading 
                title = "API list"
                description="Get your category data through API"
            />
            <ApiList 
                entityName="categories"
                entityIdName="categoryId"


            />

        </>
    )
}

export default CategoryClient;