import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { SizeForm } from "./components/size-form"
import db from "@/lib/prismadb"

interface SizeFormPageProps {
    params: {sizeId: string}
}

const SizeFormPage: React.FC<SizeFormPageProps> = async ({
    params
}) => {

    const size = await db.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm 
                    initialData={size}
                />
            </div>
        </div>
    )
}

export default SizeFormPage
