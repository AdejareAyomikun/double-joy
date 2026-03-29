// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import { cookies } from "next/headers";
// // import api from "@/api/axios";

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// // export async function POST(req: Request) {
// //   try {
// //     const { message } = await req.json();
// //     const cookieStore = await cookies();
// //     const token = cookieStore.get("admin_access")?.value;

// //     if (!token) {
// //       console.error("Auth Error: No token found in cookies");
// //       return Response.json({ error: "Unauthorized: No admin token found" }, { status: 401 });
// //     }

// //     // 1. Fetch the data from your Django Class-Based View
// //     const djangoRes = await api.get("/api/ai/context/", {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     const storeSnapshot = await djangoRes.data;

// //     // 2. Initialize Gemini
// //     const model = genAI.getGenerativeModel(
// //       { model: "gemini-1.5-pro" },
// //       { apiVersion: "v1" }
// //     );

// //     // 3. Combine context and question
// //     // const prompt = `Store Data: ${JSON.stringify(storeSnapshot)}\n\nQuestion: ${message}`;
// //     const prompt = `Context: ${JSON.stringify(storeSnapshot)}\n\nUser Question: ${message}`;
// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();

// //     return Response.json({ text });

// //     // return Response.json({ text: result.response.text() });
// //   } catch (error: any) {
// //     console.error("AI Route Error:", error.response?.data || error.message);
// //     return Response.json({ error: "Failed to process AI request" }, { status: 500 });
// //   }
// // }



// import { cookies } from "next/headers";
// import api from "@/api/axios";

// export async function POST(req: Request) {
//   try {
//     const { message } = await req.json();
//     const cookieStore = await cookies();
//     const token = cookieStore.get("admin_access")?.value;

//     if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

//     // 1. Fetch Context from Django (Confirmed Working)
//     // const djangoRes = await api.get("/ai/context/", {
//     //   headers: { Authorization: `Bearer ${token}` }
//     // });

//     const djangoRes = await api.get("https://doublejoy-backend.onrender.com/api/api/ai/context/", {
//   headers: { Authorization: `Bearer ${token}` }
// });
//     const storeSnapshot = djangoRes.data;

//     // 2. Call Gemini using the model from your successful debug list
//     const apiKey = process.env.GEMINI_API_KEY;
//     // Using 'flash-lite' to avoid the 429 'Resource Exhausted' error
//     const modelName = "models/gemini-2.0-flash-lite"; 
//     const googleUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;

//     const googleRes = await fetch(googleUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: `Context: ${JSON.stringify(storeSnapshot)}\n\nAdmin Question: ${message}`
//           }]
//         }]
//       })
//     });

//     const data = await googleRes.json();

//     // Check for Google-specific errors
//     if (data.error) {
//       console.error("Google API Error:", data.error.message);
//       return Response.json({ error: data.error.message }, { status: googleRes.status });
//     }

//     const aiText = data.candidates[0].content.parts[0].text;
//     return Response.json({ text: aiText });

//   } catch (error: any) {
//     console.error("Route Error:", error.message);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }


// // export async function POST(req: Request) {
// //   try {
// //     const { message } = await req.json();
// //     const cookieStore = await cookies();
// //     const token = cookieStore.get("admin_access")?.value;

// //     if (!token) {
// //       return Response.json({ error: "No token found" }, { status: 401 });
// //     }

// //     // --- MOVE THIS TO THE TOP ---
// //     // We hit Django BEFORE we even touch Google.
// //     console.log("Attempting to reach Render Django...");
    
// //     const djangoRes = await api.get("/api/ai/context/", {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });

// //     // If we get here, your Render logs WILL show the request.
// //     console.log("Django Fetch Successful. Status:", djangoRes.status);
// //     const storeSnapshot = djangoRes.data;

// //     // --- STOP HERE FOR A SECOND ---
// //     // Temporarily return a fake message to see if the flow works.
// //     return Response.json({ text: "Django connection confirmed! Ready for AI." });

// //   } catch (error: any) {
// //     console.error("Route Error:", error.response?.data || error.message);
// //     return Response.json({ error: error.message }, { status: 500 });
// //   }
// // }


// // export async function POST(req: Request) {
// //   try {
// //     const { message } = await req.json();
// //     const cookieStore = await cookies();
// //     const token = cookieStore.get("admin_access")?.value;

// //     if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

// //     console.log("Token check:", !!token);
// //     console.log("Axios BaseURL:", api.defaults.baseURL);

// //     // 1. Get your Django Data
// //     // const djangoRes = await api.get("/api/ai/context/", {
// //     //   headers: { Authorization: `Bearer ${token}` },
// //     // });
// //     // const storeSnapshot = djangoRes.data;
// //     // TEMPORARY: Use tiny data to test the connection
// //     // const storeSnapshot = { total_sales: 100, low_stock_items: 5 };

// //     const storeSnapshot = { test: "This is a manual test without Django" };

// //     // 2. Talk DIRECTLY to Gemini via REST (No SDK)
// //     // const modelName = "models/gemini-3-flash-preview";
// //     const modelName = "models/gemini-2.0-flash";
// //     const apiKey = process.env.GEMINI_API_KEY;
// //     // const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
// //     const googleUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;

// //     const googleRes = await fetch(googleUrl, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         contents: [{
// //           parts: [{
// //             text: `Context: ${JSON.stringify(storeSnapshot)}\n\nQuestion: ${message}`
// //           }]
// //         }]
// //       })
// //     });

// //     const data = await googleRes.json();

// //     // Check if Google returned an error
// //     if (data.error) {
// //       console.error("Google API Error:", data.error);
// //       return Response.json({ error: data.error.message }, { status: googleRes.status });
// //     }

// //     const aiText = data.candidates[0].content.parts[0].text;
// //     return Response.json({ text: aiText });

// //   } catch (error: any) {
// //     console.error("Final Route Error:", error.message);
// //     return Response.json({ error: error.message }, { status: 500 });
// //   }
// // }








import { cookies } from "next/headers";
import api from "@/api/axios";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_access")?.value;

    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Fetch Context from Django (Confirmed working on local/live)
    const djangoRes = await api.get("/api/ai/context/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const storeSnapshot = djangoRes.data;

    // 2. Call Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    // STICK TO THIS MODEL: It is the most stable for free tier
    const modelName = "models/gemini-2.0-flash-lite"; 
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;

    const googleRes = await fetch(googleUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Store Data: ${JSON.stringify(storeSnapshot)}\n\nQuestion: ${message}`
          }]
        }]
      })
    });

    const data = await googleRes.json();

    if (data.error) {
      // Log the exact message so we know if it's RPM or Daily limit
      console.error("Gemini Error:", data.error.message);
      return Response.json({ error: data.error.message }, { status: googleRes.status });
    }

    return Response.json({ text: data.candidates[0].content.parts[0].text });

  } catch (error: any) {
    console.error("Server Error:", error.message);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}