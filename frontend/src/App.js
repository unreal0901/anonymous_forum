import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Boards from "./components/Pages/Boards/Boards";
import BoardLayout from "./components/Layout/BoardLayout";
import IndividualBoard from "./components/Pages/Boards/IndividualBoard";
import Thread from "./components/Pages/Threads/Thread";
import Threads from "./components/Pages/Threads/Threads";

// Pages
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Boards />} />
      <Route path="boards" element={<BoardLayout />}>
        <Route index element={<Boards />} />
        <Route path=":id" element={<IndividualBoard />}>
          <Route index element={<Threads />} />
          <Route path="thread/:tid" element={<Thread />} />
        </Route>
      </Route>
      <Route path="*" element={<div>Error..</div>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
