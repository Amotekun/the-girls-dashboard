import db from "@/lib/prismadb";
import ProductClient from "./components/product-client";
import { format } from "date-fns";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

interface ProductPageProps {
    params: {storeId: string}
}
const ProductsPage: React.FC<ProductPageProps>= async ({
    params
}) => {

    const products = await db.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    }) 

    const formattedProducts: ProductColumn[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatter.format(product.price.toNumber()),
        category: product.category.name,
        size: product.size.name,
        color: product.color.name,
        createdAt: format(product.createdAt, "MMMM do, yyyy"),
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
    }))
    return (
        <div className="flex-col">
            <div className="space-y-8 p-8 pt-4 flex-1">
                <ProductClient 
                    data = {formattedProducts}
                />
            </div>
        </div>
    )
};

export default ProductsPage;