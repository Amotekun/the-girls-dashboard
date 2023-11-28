import db from "@/lib/prismadb";
import CategoryClient from "./components/category-client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async (
    {params}: {params: {storeId: string}}
) => {
    
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className="flex-col">
            <div className="pt-6 p-8 flex-1">
                <CategoryClient 
                    data={formattedCategories}
                />
            </div>
        </div>
    )
}

export default CategoriesPage;