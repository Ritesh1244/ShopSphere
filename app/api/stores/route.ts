import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"


export async function POST(
    req: Request
){
    try {
        // get userid from clerk
        const {userId} = auth();
        // get name from prisma
        const body = await req.json();
        const {name} = body;

        // if user id is not found
        if(!userId){
            return new NextResponse("Unauthorized",{status: 401});
        }
        // if name is not found
        if(!name){
            return new NextResponse("Name is Required",{status:400})
        }

        // create store
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log(`[STORE_POST]`,error)
        return new NextResponse("Internal Error",{status: 500});
    }
}