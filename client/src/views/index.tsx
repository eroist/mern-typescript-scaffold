import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemedSuspense from "../components/Loading";

const Home = lazy(() => import("./Home"));
const LogIn = lazy(() => import("./Auth/LogIn"));
const Register = lazy(() => import("./Auth/Register"));
const NotFound = lazy(() => import("./NotFound"));

const Views: FC = () => {
  return (
    <Suspense fallback={<ThemedSuspense />}>
      <div className={`bg-gray-100`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
};
export default Views;
