import {
  createHashRouter,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";
import Authenticate from "../pages/auth/Authenticate";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import React from "react";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "auth/:id",
        element: <Authenticate />,
      },
    ],
  },
]);

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Home />}>
//       <Route path="auth" element={<Authenticate />} />
//     </Route>
//   )
// );
