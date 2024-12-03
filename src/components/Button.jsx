import React from "react";

const Button = ({ className, onClick, phrase }) => {
    return (
        <div className={className} onClick={onClick}>
            {phrase}
        </div>
    );
};

export default Button;
