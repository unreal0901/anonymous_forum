import React from "react";
import { useGetBoardsQuery } from "../../../services/api/BoardApi";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";

const Boards = () => {
  const { data, isLoading, isFetching } = useGetBoardsQuery();
  return (
    <>
      {isLoading || isFetching ? (
        <div>Loading.....</div>
      ) : (
        <div className="boards flex gap-3 flex-wrap">
          {data.map((board) => (
            <Link
              className="relative block max-w-[25%] bg-[#F9F9FB] p-[20px] rounded-lg mt-5 "
              to={`boards/${board.boardNumber}`}
              key={board.boardNumber}
            >
              <p className=" text-[1.2rem]">{board.name}</p>
              <p className="text-[#7a7070] text-[0.9rem] pb-3">
                Description: {board.description}
              </p>
              <p className="absolute bottom-1 right-2 text-sm text-[#317FB6]">
                {formatDistanceToNow(new Date(board?.createdAt))} ago..
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Boards;
