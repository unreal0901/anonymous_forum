import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getAllBoards } from "../../../features/Boards/BoardSlice";
import { useGetBoardQuery } from "../../../services/api/BoardApi";
import Avatar from "react-avatar";
import ThreadLayout from "../Threads/ThreadLayout";

const IndividualBoard = () => {
  const { id, tid } = useParams();

  const { data, isLoading, isFetching } = useGetBoardQuery(id);
  const [boardData, setBoardData] = useState(null);
  useEffect(() => {
    if (!isLoading || !isFetching) {
      setBoardData(data);
    }
  }, [data, isFetching, isLoading]);

  return (
    <>
      <NavLink to="/" className="text-[#317fb6]">
        Home
      </NavLink>
      {!tid ? (
        <div className="flex flex-col ml-2">
          <div className="mt-5 flex gap-3 items-center">
            <div>
              <Avatar name={boardData?.name} round="10px" size={60} />
            </div>
            <div className="text-[2rem] font-medium text-gray-800">
              {boardData?.name}
            </div>
          </div>
          <div className="tags mt-3">
            <span className="mr-3 text-md font-medium">Tags:</span>
            {boardData?.tags ? (
              boardData.tags.map((e) => (
                <code
                  key={e.id}
                  className="py-[2px] px-3 border-2 rounded-lg text-sm mr-2"
                >
                  {e.title}
                </code>
              ))
            ) : (
              <span className="text-sm font-light">No tags</span>
            )}

            <code className="py-[2px] px-3 border-2 rounded-lg text-sm block w-max mt-2">
              {boardData?.threadNumber || 0} threads
            </code>
          </div>
        </div>
      ) : null}

      <Outlet />
    </>
  );
};

export default IndividualBoard;
