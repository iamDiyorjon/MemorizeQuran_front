import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Tasks } from "@/pages/tasks";
import { Learn } from "@/pages/learn";
import { Layout } from "./ui/layout";
import { FormLayout } from "./ui/layout/FormLayout";
import { useUnit } from "effector-react";
import { appInitialized } from "@/shared/state";
import { useEffect } from "react";

export const Router = () => {
  return (
    <Routes>
      <Route path="" element={<InitApp />}>
        <Route element={<Layout />}>
          <Route path={Home.route} element={<Home.component />} />
          <Route element={<FormLayout />}>
            <Route path={Tasks.route} element={<Tasks.component />} />
            <Route path={Learn.route} element={<Learn.component />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export const InitApp = () => {
  const [initializeApp] = useUnit([appInitialized]);
  useEffect(() => {
    initializeApp();
  }, []);
  return <Outlet />;
};
