import { formatDistanceToNow } from "date-fns";
import React, { useRef, useState } from "react";
import Avatar from "react-avatar";
import Comment from "./Comment";

const Reply = ({ reply }) => {
  const commentBoxRef = useRef();

  const [showCommentBox, setShowCommentBox] = useState(false);
  console.log(reply);

  const commentBoxHandler = () => {
    if (!showCommentBox) {
      setShowCommentBox(true);
      commentBoxRef.current.style.display = "block";
    }
  };

  return (
    <>
      <div className="mt-3 bg-[#fafafa] flex gap-1 p-2 rounded-lg dark:bg-[#0E162A]">
        <div className="avatar min-w-[3rem] md:w-[5%] flex justify-center pt-2 mr-2">
          <Avatar name={"user"} size="40" round={true} />
        </div>
        <div className="flex flex-col w-full">
          <div className="reply_head flex gap-2 text-[0.7rem] text-gray-600 dark:text-gray-400">
            <p>@{reply?.user}</p>
            <p>{formatDistanceToNow(new Date(reply?.createdAt))}</p>
          </div>
          <div className="reply_body w-full">
            <p className="text-[0.8rem]">{reply?.text}</p>
          </div>
          <button
            onClick={() => commentBoxHandler()}
            className="text-[1rem] w-min  hover:bg-[#c4c4c4] py-1 px-3 mt-5 rounded-2xl dark:hover:text-black"
          >
            Reply
          </button>
          <div ref={commentBoxRef} className="reply_box mt-2 hidden">
            <Comment
              commentBoxRef={commentBoxRef}
              setShowCommentBox={setShowCommentBox}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reply;
