"use client";

import React, { useEffect } from "react";
import { getOrCreateUUID } from "@/utils/uuid";

import WelcomeSegment from "@/components/WelcomeSegment";

export default function Home() {
  useEffect(() => {
    // Initialize UUID
    getOrCreateUUID();
  }, []);

  return <WelcomeSegment />;
}
