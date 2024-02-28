import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import NotAuthorized from "./pages/NotAuthorized";

const MainRouter = () => {
  return (
    <Routes>
      {/*<Route path='/home' element={<Home />} />*/}
      <Route
        path="/"
        element={
          <PrivateRoute roles={["user"]}>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/notAuthorized" element={<NotAuthorized />} />
    </Routes>
  );
};

export default MainRouter;
