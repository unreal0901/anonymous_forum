import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import Logo from "../../Assets/android-chrome-192x192.png";
import Breadcrumbs from "./BreadCrumbs";
import { useSelector } from "react-redux";
import { getCurrentBoard } from "../../features/Boards/BoardSlice";
import { getCurrentThread } from "../../features/Threads/ThreadSlice";
import { createPortal } from "react-dom";
import CreateBoardModal from "./CreateBoardModal";
import ThemeToggleIcon from "./ThemeToggleIcon";

const RootLayout = () => {
  const { id, tid } = useParams();
  const { pathname } = useLocation();

  const [showMeta, setShowMeta] = useState(false);

  useEffect(() => {
    if (pathname !== "/") setShowMeta(true);
    else setShowMeta(false);
  }, [pathname, showMeta, setShowMeta]);

  console.log(pathname);
  const boardData = useSelector(getCurrentBoard);
  const threadData = useSelector(getCurrentThread);
  const [createBoardModal, setCreateBoardModal] = useState(false);

  return (
    <>
      <div className="root-layout p-3 overflow-auto relative dark:bg-[#0E162A] dark:text-white">
        <header>
          <nav className="flex  justify-between py-2">
            <NavLink
              to="/"
              className="ml-5 flex items-center gap-2  cursor-pointer"
            >
              <img src={Logo} alt="logo" className="w-7" />
              <span className="text-[1.3rem] font-bold dark:text-white">
                Leak.it
              </span>
            </NavLink>
            <div className="flex justify-between md:gap-4 gap-2 md:mr-10 mr-2">
              <ThemeToggleIcon />

              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "border-b-2 border-[#317FB6]" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/boards"
                className={({ isActive, isPending }) =>
                  isActive ? "border-b-2 border-[#317FB6]" : ""
                }
              >
                Boards
              </NavLink>
              <NavLink
                to="/popular-threads"
                className={({ isActive, isPending }) =>
                  isActive
                    ? "border-b-2 border-[#317FB6] hidden md:block"
                    : "hidden md:block"
                }
              >
                Popular Threads
              </NavLink>
            </div>
          </nav>
          <Breadcrumbs />
        </header>
        <main>
          <div className="border-b-2 dark:border-[#95A2B8] mb-5 flex gap-3">
            {!id && !tid && showMeta && (
              <div className="flex items-center gap-5 justify-between w-full">
                <div className="my-5 bg-[#317fb6] w-max p-2 rounded-md text-white ">
                  <h2 className="text-md font-semibold">Boards</h2>
                  <p className="text-sm">Currently opened boards</p>
                </div>

                <div className="">
                  <button
                    onClick={() => {
                      console.log("Clicked");
                      setCreateBoardModal((prev) => !prev);
                    }}
                    className="w-max  px-3 bg-pink-200 hover:bg-pink-100  py-3 rounded mr-10 dark:bg-pink-400 dark:hover:bg-pink-300"
                  >
                    Add Board
                  </button>
                </div>
              </div>
            )}

            {id && (
              <div className="">
                <div className="my-5 bg-pink-400 dark:bg-pink-600 w-max p-2 rounded-md text-white ">
                  <h2 className="text-md font-semibold">{boardData?.name}</h2>
                  <p className="text-sm">Current Board</p>
                </div>
              </div>
            )}

            {tid && (
              <div className="">
                <div className="my-5 bg-purple-400 dark:bg-purple-600 w-max p-2 rounded-md text-white">
                  <h2 className="text-md font-semibold">
                    {threadData?.subject}
                  </h2>
                  <p className="text-sm">Current Thread</p>
                </div>
              </div>
            )}
          </div>
          <Outlet />
        </main>
      </div>
      {createBoardModal
        ? createPortal(
            <CreateBoardModal closeModal={setCreateBoardModal} />,
            document.body
          )
        : null}
    </>
  );
};

export default RootLayout;
