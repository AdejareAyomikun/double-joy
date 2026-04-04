// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { message } = await req.json();

//     // 1. Validate Input
//     if (!message || message.trim() === "") {
//       return NextResponse.json({ error: "Please enter a message" }, { status: 400 });
//     }

//     const cookieStore = await cookies();
//     const token = cookieStore.get("admin_access")?.value;

//     // 2. Fetch Django Data
//     let storeSnapshot = "{}";
//     try {
//       const djangoRes = await fetch("https://doublejoy-backend.onrender.com/api/api/ai/context/", {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (djangoRes.ok) {
//         const data = await djangoRes.json();
//         // Limit the snapshot size just in case
//         storeSnapshot = JSON.stringify(data).substring(0, 3000); 
//       }
//     } catch (e) { console.error("Context fetch failed"); }

//     // 3. Call Groq
//     const apiKey = process.env.GROQ_API_KEY;

//     const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama-3.3-70b-versatile", // Use the updated 2026 model ID
//         messages: [
//           { role: "system", content: `You are an admin bot. Data: ${storeSnapshot}` },
//           { role: "user", content: message }
//         ],
//         max_tokens: 500 // Keep it small to avoid limits
//       }),
//     });

//     const data = await groqRes.json();

//     if (!groqRes.ok) {
//       // LOOK AT YOUR TERMINAL FOR THIS LOG:
//       console.error("GROQ ERROR DATA:", JSON.stringify(data, null, 2));
//       return NextResponse.json({ error: data.error?.message || "AI Error" }, { status: 400 });
//     }

//     return NextResponse.json({ text: data.choices[0].message.content });

//   } catch (error: any) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// Version 1


import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json(); // ADDED: history
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_access")?.value;

    let storeSnapshot = "{}";
    try {
      const djangoRes = await fetch("https://doublejoy-backend.onrender.com/api/api/ai/context/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (djangoRes.ok) {
        storeSnapshot = await djangoRes.json();
      }
    } catch (e) { console.error("Context fetch failed"); }

    const apiKey = process.env.GROQ_API_KEY;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are the DoubleJoy Admin Intelligence.
            CONTEXT: ${JSON.stringify(storeSnapshot)}
            IDENTITY: You are an expert business analyst for an e-commerce platform.
            TONE: Professional, insightful, and concise. 
            CURRENCY: Always use Nigerian Naira (₦).
            RULES: 
            - If stock is low, suggest immediate restock.
            - If revenue is high, congratulate the admin.
            - Use bullet points for lists.`
          },
          ...history.slice(-10), // ADDED: Spreading previous messages
          { role: "user", content: message }
        ],
      }),
    });

    const data = await groqRes.json();
    if(!data.choices) throw new Error("Groq API Error")
    return NextResponse.json({ text: data.choices[0].message.content });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}