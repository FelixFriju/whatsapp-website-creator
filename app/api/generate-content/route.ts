import { NextResponse } from "next/server";
import { z } from "zod";
import { generateContent } from "@/lib/ai/content";
const schema=z.object({companyName:z.string().min(2).max(100),businessType:z.string().min(2).max(100)});
export async function POST(req:Request){try{const input=schema.parse(await req.json());return NextResponse.json(await generateContent(input));}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400})}}
