import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./access";
import Login from "../features/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
