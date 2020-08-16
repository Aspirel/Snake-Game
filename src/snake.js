import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeBody.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return(
                    <div className="snakeBody" key={i} style={style}></div>
                )
            })}
        </div>
    )
}