import classNames from "classnames";
import React from "react";

const BoxSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
    return (
        <div className={classNames(className, "rounded-xl border border-gray-100 bg-white p-4")} {...props}>
            {children}
        </div>
    );
};

export default BoxSection;
