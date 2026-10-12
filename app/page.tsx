import type { Metadata } from "next";
import HomePage from "@/components/site/HomePage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", id: "/id" },
  },
};

export default function Home() {
  return <HomePage lang="en" />;
}
