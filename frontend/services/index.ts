"use server";

import { APiResponse, HealthzResponse, Link } from "@/types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const getServerHealth = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/healthz`, {
      cache: "no-store",
      method: "GET",
    });

    const data: APiResponse<HealthzResponse> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllLinks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/links`, {
      cache: "no-store",
      method: "GET",
    });

    const data: APiResponse<Array<Link>> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLinkByCode = async (code: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/links/${code}`, {
      cache: "no-store",
      method: "GET",
    });
    const data: APiResponse<Link> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createLink = async (url: string, code: string | null = null) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    const data: APiResponse<Link> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteLink = async (code: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/links/${code}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ code }),
    });
    const data: APiResponse<null> = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLinkStats = async (code: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/${code}`, {
      cache: "no-store",
      method: "GET",
    });

    const data: APiResponse<Link> = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
