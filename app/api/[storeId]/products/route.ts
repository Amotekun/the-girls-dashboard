import db from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
        } = body

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        };

        if (!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if (!price) {
            return new NextResponse("Price is required", {status: 400})
        };

        if (!categoryId) {
            return new NextResponse("Category Id is required", {status: 400})
        };

        if (!colorId) {
            return new NextResponse("Color Id is required", {status: 400})
        };

        if (!sizeId) {
            return new NextResponse("Size Id is required", {status: 400})
        };

        if (!images || images.length === 0) {
            return new NextResponse("Images are required", {status: 400})
        };

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
        };

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        };

        const products = await db.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCT_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    } 
} 