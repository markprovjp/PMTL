import { STRAPI_API } from "@/lib/strapi-client";

export interface LunarEvent {
  id: number;
  documentId: string;
  title: string;
  isRecurringLunar: boolean;
  lunarMonth: number | null;
  lunarDay: number | null;
  solarDate: string | null;
  eventType: 'buddha' | 'bodhisattva' | 'teacher' | 'fast' | 'holiday' | 'normal';
  reciteCount: number;
  teachings: unknown; // rich text
  todoList: unknown; // rich text
}

export async function fetchLunarEvents(): Promise<LunarEvent[]> {
  try {
    // Disable cache to ensure we get latest events after publish
    const res = await fetch(`${STRAPI_API}/api/lunar-events?pagination[limit]=100`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      console.error("[LunarAPI] Fetch failed", res.status);
      return [];
    }
    const json = await res.json();
    console.log("[LunarAPI] Received from Strapi:", json);

    if (!json.data) return [];

    return json.data.map((item: { id: number, documentId: string, attributes?: unknown, [key: string]: unknown }) => {
      // Strapi v5 often has a flatter structure, but we check both for compatibility
      const attrs = (item.attributes as any) || item;
      return {
        ...attrs,
        id: item.id,
        documentId: item.documentId,
      };
    });
  } catch (err) {
    console.error("[LunarAPI] Error:", err);
    return [];
  }
}
