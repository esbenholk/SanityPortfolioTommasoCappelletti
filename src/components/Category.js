import React from "react";
import { Suspense } from "react";

export default function Category() {
  return (
    <div className="content-container">
      <Suspense fallback={null}>
        <h1>Cetagory</h1>
      </Suspense>
    </div>
  );
}
