// src/services/notifications/stream-manager.ts
import { appConfig } from "~/configs/config";
import { endpoints } from "~/constants/endpoints";
import { ApiNotification } from "~/entities/notification.entity";

type Listener = (notification: ApiNotification) => void;

class NotificationStreamManager {
    private static instance: NotificationStreamManager;
    private eventSource: EventSource | null = null;
    private listeners: Set<Listener> = new Set();
    private url = `${appConfig.baseUrl}${endpoints.notifications.STREAM}`;

    static getInstance(): NotificationStreamManager {
        if (!NotificationStreamManager.instance) {
            NotificationStreamManager.instance = new NotificationStreamManager();
        }
        return NotificationStreamManager.instance;
    }

    connect() {
        if (this.eventSource || typeof window === "undefined") return;

        this.eventSource = new EventSource(this.url, { withCredentials: true });

        this.eventSource.onopen = () => {
            console.log("SSE Connected");
        };

        this.eventSource.onmessage = (event) => {
            if (!event.data.trim() || event.data.startsWith(":")) return; // ignore heartbeat
            try {
                const notification: ApiNotification = ApiNotification.fromJson(JSON.parse(event.data));
                this.listeners.forEach((listener) => listener(notification));
            } catch (err) {
                console.error("Failed to parse SSE message:", err);
            }
        };

        this.eventSource.onerror = () => {
            console.warn("SSE Error - will retry...");
            // EventSource auto-reconnects
        };
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        this.listeners.clear();
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        this.connect(); // auto-connect if not already
        return () => this.unsubscribe(listener);
    }

    unsubscribe(listener: Listener) {
        this.listeners.delete(listener);
        if (this.listeners.size === 0) {
            this.disconnect();
        }
    }
}

export const notificationStreamer = NotificationStreamManager.getInstance();
