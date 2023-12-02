import db from "@/lib/prismadb";
import ColorClient from "./components/color-client";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";

interface ColorPageProps {
    params: {storeId: string}
}
const ColorsPage: React.FC<ColorPageProps> = async ({
    params
}) => {

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        },
    })

    const formattedColors: ColorColumn[] = colors.map((color) => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient 
                    data={formattedColors}
                />
            </div>
        </div>
    )
}

export default ColorsPage;