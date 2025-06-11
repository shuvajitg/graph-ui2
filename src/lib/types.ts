export type GraphData = {
  id: string;
  type: "line" | "bar" | "pie";
  title: string;
  description: string;
  data: Array<{ [key: string]: string | number }>;
};

export interface UseApiProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Allow other HTTP methods if needed
  isSecure?: boolean;
}

export interface UseApiResponse {
  data: JSON | null;
  loading: boolean;
  error: string | null;
  fetchData: (body?: any) => Promise<JSON | null>;
}

import React from "react";

export type GraphlistType = {
  lable: string;
  name: string;
  icon: React.ReactElement;
  colorSchemes?: string[] | undefined
}
