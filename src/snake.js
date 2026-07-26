import React from "react";

function Snake({ snakeDots }) {
  return (
    <>
      {snakeDots.map((dot, idx) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className="snake-dot" key={idx} style={style} />;
      })}
    </>
  );
}

export default Snake;
