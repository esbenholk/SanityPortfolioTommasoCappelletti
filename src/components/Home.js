import React from "react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="content-container">
      <Suspense fallback={null}>
        <h1>home</h1>
      </Suspense>
    </div>
  );
}
