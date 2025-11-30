import React from "react";
import { ApiNotification } from "~/entities/notification.entity";
import { notificationStreamer } from "../stream-manager";

export function useNotificationStream(onNotification: (n: ApiNotification) => void) {
    React.useEffect(() => {
        return notificationStreamer.subscribe(onNotification);
    }, [onNotification]);
}
