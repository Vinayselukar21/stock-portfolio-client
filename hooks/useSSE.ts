"use client";

import { useEffect, useState } from "react";

export default function useSSE<T = string>(url: string | null) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) return;

    const es = new EventSource(url);

    es.onmessage = (event: MessageEvent) => {
      setData(event.data as T);
    };

    es.onerror = (error) => {
      console.error("SSE error:", error);
      es.close();
    };

    return () => {
      es.close();
    };
  }, [url]);

  return data;
}
