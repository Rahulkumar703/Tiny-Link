"use client";

import { LinksProvider } from "@/context/LinksContext";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <LinksProvider>{children}</LinksProvider>;
};

export default Providers;
