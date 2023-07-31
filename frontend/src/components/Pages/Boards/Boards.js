import React, { useEffect, useState } from "react";
import { useGetBoardsQuery } from "../../../services/api/BoardApi";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Shimmer from "../../Shimmer/Shimmer";
// import { useSelector } from "react-redux";
// import { getSearchBoard } from "../../../features/Boards/BoardSlice";

const Boards = () => {
  const { data, isLoading, isFetching, isSuccess } = useGetBoardsQuery();
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [searchedBoard, setSearchedBoard] = useState("");
  const [filterModal, setFilterModal] = useState(false);

  useEffect(() => {
    if (isSuccess && !isLoading && !isFetching && searchedBoard?.length > 0) {
      const filteredItems = data.filter((board) =>
        board?.name?.toLowerCase().includes(searchedBoard.toLowerCase())
      );
      setFilteredBoards(filteredItems);
    } else if (
      searchedBoard?.length === 0 &&
      isSuccess &&
      !isLoading &&
      !isFetching
    ) {
      setFilteredBoards(data);
    }
  }, [isLoading, isFetching, isSuccess, data, searchedBoard]);

  const filterByName = () => {
    const sortedBoards = [...filteredBoards].sort((a, b) => {
      return a?.name?.localeCompare(b?.name);
    });
    setFilteredBoards(sortedBoards);
  };

  const filterByDate = () => {
    const sortedBoards = [...filteredBoards].sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    });

    setFilteredBoards(sortedBoards);
  };

  return (
    <>
      {isLoading || isFetching ? (
        <div className="mt-12 w-[95%] flex  gap-2 flex-wrap">
          {[1, 2, 3, 4].map((e, i) => (
            <Shimmer key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="board_funcions flex justify-center gap-2 items-center">
            <div
              className="filter text-3xl text-[#317FB6] hover:text-[#3992d1] dark:bg-[#1E283A] rounded-lg px-2 py-1 relative cursor-pointer text-center "
              onClick={() => setFilterModal((prev) => !prev)}
            >
              <i className="bx bx-sort"></i>
              {filterModal ? (
                <div className="absolute  w-[7rem] shadow-2xl bg-white dark:bg-[#1E283A] py-2 px-3 z-10 rounded-md left-0 top-10">
                  <button
                    onClick={() => filterByDate()}
                    className="byDate w-full  mb-1 text-sm text-left text-black dark:text-gray-400 hover:text-[#3992d1] dark:hover:text-[#3992d1] shadow-xl"
                  >
                    by Date
                  </button>
                  <button
                    onClick={() => filterByName()}
                    className="byDate w-full text-sm text-black text-left dark:text-gray-400 hover:text-[#3992d1] shadow-xl dark:hover:text-[#3992d1]"
                  >
                    by Name
                  </button>
                </div>
              ) : null}
            </div>
            <input
              placeholder="Search Board"
              onChange={(e) => {
                setSearchedBoard(e.target.value);
              }}
              className="w-[50%] text-sm shadow-sm py-2 px-3 text-gray-900 rounded-md border bg-gray-50 outline-none  focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
            />
          </div>
          <div className="boards flex gap-3 flex-wrap md:justify-center justify-normal">
            {filteredBoards?.map((board) => (
              <Link
                className="group relative block md:min-w-[23%]  min-w-full md:max-w-[23%]  bg-[#F9F9FB] dark:bg-[#1E283A] p-[20px] rounded-lg mt-5 "
                to={`${board.boardNumber}`}
                key={board.boardNumber}
              >
                <p className="group-hover:text-[#317FB6] text-[1.2rem]">
                  {board.name}
                </p>
                <p className="text-[#7a7070] dark:text-[#95A2B8] text-[0.9rem] pb-3">
                  Description: {board.description}
                </p>
                <p className="absolute bottom-1 right-2 text-sm text-[#317FB6]">
                  {formatDistanceToNow(new Date(board?.createdAt))} ago..
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Boards;
