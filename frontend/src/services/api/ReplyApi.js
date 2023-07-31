import baseQuery from "../utils/customFetchBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setThreads } from "../../features/Threads/ThreadSlice";
import { setReplies } from "../../features/Replies/ReplySlice";

export const replyApi = createApi({
  reducerPath: "replyApi",
  baseQuery: baseQuery,
  tagTypes: ["Reply"],
  endpoints: (builder) => ({
    getThreadReplies: builder.query({
      query(threadNumber) {
        return {
          url: "reply/thread",
          credentials: "include",
          params: {
            threadNumber: threadNumber,
          },
        };
      },
      providesTags: ["Reply"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setReplies(data));
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
    postThreadReply: builder.mutation({
      query(payload) {
        const { threadNumber, text, user } = payload;
        return {
          url: "reply/create",
          credentials: "include",
          method: "POST",
          body: {
            threadNumber,
            text,
            user,
            parentReplyId: null,
          },
        };
      },
      providesTags: ["Reply"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {}
      },

      transformResponse: (result) => {
        return result?.data;
      },
    }),
  }),
});

export const { useGetThreadRepliesQuery, usePostThreadReplyMutation } =
  replyApi;
