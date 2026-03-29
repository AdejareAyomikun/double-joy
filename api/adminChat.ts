// api/adminChat.ts
export const askAiAssistant = async (message: string) => {
  const response = await fetch("/api/admin/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("AI Assistant is currently unavailable");
  }

  return response.json();
};