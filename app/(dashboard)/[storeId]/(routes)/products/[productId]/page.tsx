import db from "@/lib/prismadb"
import ProductForm from "./components/product-form"

interface ProductFormPageProps {
    params: {storeId: string, productId: string}
}

const ProductFormPage: React.FC<ProductFormPageProps> =  async ({
    params
}) => {

    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    });

    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId,
        }
    });

    const sizes = await db.size.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const colors = await db.color.findMany({
        where: {
            storeId: params.storeId
        }
    });

  return (
    <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-8">
            <ProductForm
                categories = {categories}
                sizes = {sizes}
                colors={colors}
                initialData = {product}

            />
        </div>
    </div>
  )
}

export default ProductFormPage