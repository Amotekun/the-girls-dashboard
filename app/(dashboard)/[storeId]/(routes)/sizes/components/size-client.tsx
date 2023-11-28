"use client"

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading 
                    title={`Sizes(${data.length})`}
                    description="Select your size to display"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/sizes/new`) }
                >
                    <Plus className="mr-2 h-4 w-4"/>
                    Add new size
                </Button>
            </div>
            <Separator />
            <DataTable 
                searchKey=""
                columns={columns}
                data={data}
            />
            <Separator />
            <Heading 
                title="API list"
                description="Get your size data through API"
            />
            <ApiList 
                entityName="size"
                entityIdName="sizeId"
            />
        </>
    )
}

export default SizeClient;