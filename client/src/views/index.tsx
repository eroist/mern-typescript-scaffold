import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemedSuspense from "../components/Loading";

const NotFound = lazy(() => import("./NotFound"));

const Views: FC = () => {
  return (
    <Suspense fallback={<ThemedSuspense />}>
      <div className={`flex flex-row h-screen relative bg-gray-100`}>
        <Routes>
          <Route path="/" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
};
export default Views;
