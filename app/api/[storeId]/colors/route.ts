import db from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
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

        if (!name || !value) {
            return new NextResponse("Missing name or value", {status: 400})
        };

        if(!params.storeId) {
            return new NextResponse("Missing storeId", {status: 400})
        };

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 401})
        };

        const color = await db.color.create({
            data:{
                name,
                value, 
                storeId: params.storeId
            }
        });

        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLOR_POST]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}