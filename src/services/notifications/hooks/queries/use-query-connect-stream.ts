import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { QueryKey } from "~/constants/query-key";
import { endpoints } from "~/constants/endpoints";
import { appConfig } from "~/configs/config";
import { Notification } from "~/entities/notification.entity";

interface UseQueryConnectStreamOptions {
    enabled?: boolean;
    onNotification?: (notification: Notification) => void;
    onError?: (error: Event) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export function useQueryConnectStream(options: UseQueryConnectStreamOptions = {}) {
    const { enabled = true, onNotification, onError, onConnect, onDisconnect } = options;
    const eventSourceRef = useRef<EventSource | null>(null);
    const [connectionState, setConnectionState] = useState<"disconnected" | "connecting" | "connected" | "error">(
        "disconnected",
    );
    const [lastNotification, setLastNotification] = useState<Notification | null>(null);

    const { isLoading, error, refetch } = useQuery({
        queryKey: [QueryKey.NOTIFICATIONS.STREAM],
        enabled,
        queryFn: async () => {
            return new Promise<{ connected: boolean }>((resolve, reject) => {
                try {
                    // Close existing connection if any
                    if (eventSourceRef.current) {
                        eventSourceRef.current.close();
                    }

                    setConnectionState("connecting");

                    // Create new EventSource connection with full URL
                    const streamUrl = `${appConfig.baseUrl}${endpoints.notifications.STREAM}`;
                    const eventSource = new EventSource(streamUrl, {
                        withCredentials: true,
                    });

                    eventSourceRef.current = eventSource;

                    eventSource.onopen = () => {
                        setConnectionState("connected");
                        onConnect?.();
                        resolve({ connected: true });
                    };

                    eventSource.onmessage = (event) => {
                        try {
                            const notification: Notification = JSON.parse(event.data);
                            setLastNotification(notification);
                            onNotification?.(notification);
                        } catch (parseError) {
                            console.error("Failed to parse notification:", parseError);
                        }
                    };

                    eventSource.onerror = (event) => {
                        setConnectionState("error");
                        onError?.(event);

                        // Don't reject immediately, EventSource will automatically retry
                        setTimeout(() => {
                            if (eventSource.readyState === EventSource.CLOSED) {
                                reject(new Error("EventSource connection closed"));
                            }
                        }, 1000);
                    };
                } catch (error) {
                    setConnectionState("error");
                    reject(error);
                }
            });
        },
        retry: (failureCount) => {
            // Retry up to 3 times with exponential backoff
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Keep connection alive
        staleTime: Infinity,
        gcTime: Infinity, // Previously cacheTime in v4
    });

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                setConnectionState("disconnected");
                onDisconnect?.();
            }
        };
    }, [onDisconnect]);

    // Handle enabled state changes
    useEffect(() => {
        if (!enabled && eventSourceRef.current) {
            eventSourceRef.current.close();
            setConnectionState("disconnected");
            onDisconnect?.();
        }
    }, [enabled, onDisconnect]);

    const disconnect = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            setConnectionState("disconnected");
            onDisconnect?.();
        }
    };

    const reconnect = () => {
        refetch();
    };

    return {
        isConnected: connectionState === "connected",
        connectionState,
        lastNotification,
        isLoading,
        error,
        disconnect,
        reconnect,
    };
}
