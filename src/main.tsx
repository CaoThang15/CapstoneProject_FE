import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import "~/configs/i18n";
import { AuthContextProvider } from "./contexts/auth.context.tsx";
import { HttpContextProvider } from "./contexts/http.context.tsx";
import "./index.css";
import { MaterialUIThemeProvider } from "./libs/material-ui/theme.provider.tsx";
import { ReactQueryProvider } from "./libs/query-client/provider.tsx";
import { ApplicationRoutes } from "./routes/index.tsx";
import "~/utils/string.exts.ts";
import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById("root")!).render(
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <ReactQueryProvider>
            <HttpContextProvider>
                <AuthContextProvider>
                    <MaterialUIThemeProvider>
                        {/* <GlobalSpinnerQuery /> */}
                        <ApplicationRoutes />
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            closeButton={false}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Zoom}
                            toastStyle={{
                                padding: "12px 20px",
                                borderRadius: "12px",
                                minHeight: "auto",
                                background: "#fff",
                                color: "#2F3645",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                                border: "1px solid #f0f0f0",
                            }}
                            toastClassName="toast-body"
                        />
                    </MaterialUIThemeProvider>
                </AuthContextProvider>
            </HttpContextProvider>
        </ReactQueryProvider>
    </BrowserRouter>,
);
