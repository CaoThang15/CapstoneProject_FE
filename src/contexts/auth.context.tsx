import { AxiosError } from "axios";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import i18n from "~/configs/i18n";
import { User } from "~/entities";
import { getAxiosErrorMessageKey } from "~/libs/axios/helper";
import { IBaseApiResponse } from "~/libs/axios/types";
import { authService } from "~/services/auth";
import { TLoginRequest, TLoginResponse, TRegisterRequest, TVerifyOtpRequest } from "~/services/auth/types";
import { showToast } from "~/utils";

export type AuthContextProps = {
    isLoading: boolean;
    isInitialized: boolean;
    user: User | null;
    login: (params: TLoginRequest) => Promise<void>;
    logout: () => void;
    verifyLoginOtp: (params: TVerifyOtpRequest) => Promise<void>;
    register: (params: TRegisterRequest) => Promise<void>;
    verifyRegisterOtp: (params: TVerifyOtpRequest) => Promise<void>;
};

const defaultProvider: AuthContextProps = {
    isLoading: true,
    isInitialized: false,
    user: null,
    login: () => Promise.resolve(),
    logout: () => {},
    verifyLoginOtp: () => Promise.resolve(),
    verifyRegisterOtp: () => Promise.resolve(),
    register: () => Promise.resolve(),
};

export const AuthContext = React.createContext(defaultProvider);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const loadUserInfor = React.useCallback(async () => {
        try {
            const response = await authService.getCurrentUser();
            setUser(response.data);
        } catch {
            setUser(null);
        }
    }, []);

    const handleLogin = React.useCallback(async (params: TLoginRequest) => {
        try {
            setIsLoading(true);
            await authService.login(params);
        } catch (error) {
            const axiosError = error as AxiosError<IBaseApiResponse<TLoginResponse>>;

            if (!axiosError.response) {
                showToast.error(t(i18n.translationKey.somethingWentWrong));
            } else {
                showToast.error(t(axiosError.response.data.message));
            }

            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleRegister = React.useCallback(async (params: TRegisterRequest) => {
        try {
            setIsLoading(true);
            await authService.register(params);
        } catch (error) {
            console.log(error);
            showToast.error(getAxiosErrorMessageKey(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLogout = React.useCallback(async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            navigate("/");
            showToast.success(t(i18n.translationKey.logoutSuccessfully));
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleVerifyLoginOtp = React.useCallback(async (params: TVerifyOtpRequest) => {
        try {
            setIsLoading(true);
            await authService.verifyLoginOtp(params);
            await initializeUser();
        } catch (error) {
            showToast.error(getAxiosErrorMessageKey(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleVerifyRegisterOtp = React.useCallback(async (params: TVerifyOtpRequest) => {
        try {
            setIsLoading(true);
            await authService.verifyRegisterOtp(params);
            await initializeUser();
        } catch (error) {
            showToast.error(getAxiosErrorMessageKey(error));
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const initializeUser = async () => {
        setIsInitialized(false);
        setIsLoading(true);

        await Promise.all([loadUserInfor()]);

        setIsInitialized(true);
        setIsLoading(false);
    };

    React.useEffect(() => {
        initializeUser();
    }, []);

    const value = React.useMemo(
        () => ({
            isLoading,
            isInitialized,
            user,
            login: handleLogin,
            logout: handleLogout,
            verifyLoginOtp: handleVerifyLoginOtp,
            verifyRegisterOtp: handleVerifyRegisterOtp,
            register: handleRegister,
        }),
        [
            isLoading,
            isInitialized,
            user,
            handleLogin,
            handleLogout,
            handleVerifyLoginOtp,
            handleVerifyRegisterOtp,
            handleRegister,
        ],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthContextProvider");
    }

    return context;
};
