import React from "react";

const CommentsPage = ({ params }) => {
  return (
    <div>
      <h2>{params.commentsId}</h2>
    </div>
  );
};

export default CommentsPage;
