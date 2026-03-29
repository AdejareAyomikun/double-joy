import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Fetch the "Snapshot" from your Django Class-Based View
    // Note: You'll need to pass the admin's token for authentication
    const djangoRes = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/ai/context/`, {
      headers: {
        'Authorization': `Bearer ${req.headers.get('Authorization')}`, // Pass through the admin's JWT/Token
      }
    });
    const storeData = await djangoRes.json();

    // 2. Initialize Gemini 1.5 Flash (The fast, free-tier model)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are the Double-Joy Admin Assistant. 
        Use this real-time store data to answer the owner's questions: ${JSON.stringify(storeData)}. 
        Be concise, professional, and highlight any low stock or high sales trends.`
    });

    // 3. Generate the response
    const result = await model.generateContent(message);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });

  } catch (error) {
    console.error("Gemini Bridge Error:", error);
    return NextResponse.json({ error: "Failed to reach AI" }, { status: 500 });
  }
}