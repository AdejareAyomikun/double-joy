import api from "./axios";

export const getAdminAnalytics = async (token: string) => {
    try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            throw new Error("No token found. Please login first.");
        }
        const res = await api.get("/admin/analytics/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (err: any) {
        console.error("Error fetching analytics:", err.response || err);
        throw err;
    }
};