import db from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH() {
    try {

    } catch (error) {
        console.log("[PRODUCT_PATCH]", error)
        return new NextResponse("Internal error", {status: 500})
    } 
} 

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
) {
    try {
        const {userId} = auth()
        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.productId) {
            return new NextResponse("Product Id is required", {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Store not found", {status: 403})
        }

        const products = await db.product.deleteMany({
            where: {
                id: params.productId
            }
        });

        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}