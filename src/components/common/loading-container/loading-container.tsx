import React from "react";
import { Spinner } from "~/components/layout/spinner";

interface LoadingContainerProps extends React.PropsWithChildren {
    isLoading: boolean;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({ isLoading, children }) => {
    if (isLoading) {
        return <Spinner />;
    }

    return children;
};

export default LoadingContainer;
