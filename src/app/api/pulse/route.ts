import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/pulse
// Endpoint seguro de telemetría para Mercenario Admin
// Retorna métricas de uso del sistema actual
export async function GET(request: Request) {
    // Validar el token secreto de Mercenario Admin
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token || token !== process.env.PULSE_SECRET_TOKEN) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const supabase = await createClient();

        // Período actual (año-mes)
        const now = new Date();
        const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // Contar registros clave del sistema
        const [
            { count: clientsCount },
            { count: ordersCount },
            { count: messagesCount },
        ] = await Promise.all([
            supabase.from("customers").select("*", { count: "exact", head: true }),
            supabase.from("service_orders").select("*", { count: "exact", head: true }).gte("created_at", `${period}-01`),
            supabase.from("ai_tasks_queue").select("*", { count: "exact", head: true }).gte("created_at", `${period}-01`),
        ]);

        return NextResponse.json({
            status: "online",
            period,
            timestamp: now.toISOString(),
            metrics: {
                total_clients: clientsCount ?? 0,
                orders_this_month: ordersCount ?? 0,
                ai_tasks_this_month: messagesCount ?? 0,
            },
        });
    } catch (error) {
        console.error("Pulse error:", error);
        return NextResponse.json(
            { status: "degraded", error: "Internal error" },
            { status: 500 }
        );
    }
}
