export const askAiAssistant = async (message: string, history: any[]) => {
    const response = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
    });
    return response.json();
};