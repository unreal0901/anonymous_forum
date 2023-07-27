import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="root-layout">
        <header>
          <nav>
            <h1>Leak.it</h1>
            <div className="flex gap-12">
              <NavLink to="/">Boards</NavLink>
              <NavLink to="/popular-threads">Popular Threads</NavLink>
            </div>
          </nav>
          {/* <Breadcrumbs /> */}
        </header>
        <main>
          <div className="border-b-2 mb-5">
            <div className="my-5 bg-[#317fb6] w-max p-2 rounded-md text-white ">
              <h2 className="text-md font-semibold">Boards</h2>
              <p className="text-sm">Currently opened boards</p>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
