import React from "react";
import { useSelector } from "react-redux";
import { getCurrentBoard } from "../../../features/Boards/BoardSlice";
import sanitizeHtml from "sanitize-html";
import Avatar from "react-avatar";
import { formatDistanceToNow } from "date-fns";
import ThreadLayout from "./ThreadLayout";

const Post = ({ postData }) => {
  const boardData = useSelector(getCurrentBoard);
  const { data: post } = postData;
  const boardName = boardData?.name;
  console.log(post);

  const getContent = (content) => {
    let cleanHtml = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: { img: ["src"] },
      allowedSchemes: ["data", "http", "https"],
    });
    return cleanHtml;
  };

  return (
    <>
      <div className="post bg-[#fafafa] px-5 py-3 mt-3 rounded-lg dark:bg-[#1E283A] p-2 dark:text-gray-400">
        <div className="head">
          <div className="flex gap-1 items-center">
            <Avatar name={boardName} size="20" round={true} />
            <p>{boardName} .</p>
            <div className="post_meta text-xs flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <p className="posted_by">Posted by {post?.user}</p>
              <p className="postedDate">
                {formatDistanceToNow(new Date(post?.createdAt))}
              </p>
            </div>
          </div>
        </div>
        <ThreadLayout />
        <div
          className="content  "
          dangerouslySetInnerHTML={{ __html: getContent(post?.content) }}
        ></div>
      </div>
    </>
  );
};

export default Post;
