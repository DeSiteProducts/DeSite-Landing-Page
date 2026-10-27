"use client";

import { useEffect, useRef } from "react";
import { attributionFields, getVisitAttribution } from "../../lib/attribution";

export function VisitAttributionTracker() {
  useEffect(() => { getVisitAttribution(); }, []);
  return null;
}

export function ContactAttribution() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const attribution = getVisitAttribution();
    container.current?.querySelectorAll("input").forEach((input) => {
      input.value = attribution[input.name as keyof typeof attribution];
    });
  }, []);

  return (
    <div hidden ref={container}>
      {attributionFields.map((name) => (
        <input key={name} type="hidden" name={name}
          defaultValue={name === "traffic_source" ? "unknown" : ""} />
      ))}
    </div>
  );
}
