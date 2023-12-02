import db from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, colorId: string}}
) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {name, value} = body 

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!value || !name || !params.storeId) {
            return new NextResponse('value, name and color Id are required', {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const updateStore = await db.color.update({
            where: {
                id: params.colorId
            },
            data: {
                name, 
                value
            },
        });

        return NextResponse.json(updateStore)
    } catch (error) {
        console.log("[COLOR_PATCH]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, colorId: string}}
) {
    try {
        const {userId} = auth()
        
        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse('Store Id is required', {status: 400})
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const deleteColor = await db.color.deleteMany({
            where: {
                id: params.colorId
            }
        });
        
        return NextResponse.json(deleteColor)
    } catch (error) {
        console.log("[COLOR_DELETE", error)
        return new NextResponse("Internal error", {status: 500})
    }
}