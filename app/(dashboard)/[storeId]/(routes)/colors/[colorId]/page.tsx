import db from "@/lib/prismadb";
import ColorForm from "./components/color-form";

interface ColorFormPageProps {
    params: {colorId: string}
}
const ColorFormPage: React.FC<ColorFormPageProps> = async ({
    params
}) => {

    const color = await db.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    )
}

export default ColorFormPage;