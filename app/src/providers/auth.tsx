import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import cookies from "js-cookie";
import { signup } from "../api/actions/signup/signup";
import { useSignup } from "../api/actions/signup/useSignup";
import { login } from "../api/actions/login/login";
import { decodeJwtToken } from "../helpers/decodeJwtToken";
import { refreshToken } from "../api/actions/refreshToken/refreshToken";
import { useLogin } from "../api/actions/login/useLogin";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthProviderValue = {
  // Properties
  isAuthenticated: boolean;
  userId: string | undefined;
  // Methods
  // eslint-disable-next-line no-unused-vars
  login: (data: Parameters<typeof login>[0]) => void;
  // eslint-disable-next-line no-unused-vars
  signup: (data: Parameters<typeof signup>[0]) => void;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    cookies.get("access_token"),
  );
  const refreshTokenCookie = cookies.get("refresh_token");

  const decodedAccessToken = useMemo<{ userId: string } | undefined>(() => {
    return decodeJwtToken<{ userId: string }>({
      token: accessToken,
    });
  }, [accessToken]);

  const isAuthenticated = useMemo<boolean>(() => {
    return accessToken !== undefined ? true : false;
  }, [accessToken]);

  const [userId, setUserId] = useState<string | undefined>(
    decodedAccessToken?.userId,
  );

  const navigate = useNavigate();
  const { mutate: signupUser } = useSignup();
  const { mutate: loginUser } = useLogin();

  useEffect(() => {
    if (!accessToken && refreshTokenCookie) {
      refreshToken(refreshTokenCookie).then(() => {
        setAccessToken(cookies.get("access_token"));
        navigate("/");
      });
    }
  }, [navigate, accessToken, refreshTokenCookie]);

  const signupAction = (data: Parameters<typeof signup>[0]) => {
    signupUser(data, {
      onError: (error) => {
        console.error(error);
        toast.error("Error signing up!", { position: "bottom-right" });
      },
      onSuccess: () => {
        toast.success("Successfully signed up!", { position: "bottom-right" });
        navigate("/login");
      },
    });
  };

  const loginAction = (data: Parameters<typeof login>[0]) => {
    loginUser(data, {
      onError: (error) => {
        console.error(error);
        toast.error("Error logging in!", { position: "bottom-right" });
      },
      onSuccess: () => {
        setUserId(decodedAccessToken?.userId);
        setAccessToken(cookies.get("access_token"));
        navigate("/");
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        signup: signupAction,
        login: loginAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthProviderValue => {
  const authContext = useContext(AuthContext);

  const auth = useMemo(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    const auth: AuthProviderValue = {
      isAuthenticated: authContext.isAuthenticated,
      userId: authContext.userId,
      signup: authContext.signup,
      login: authContext.login,
    };

    return auth;
  }, [authContext]);

  return auth;
};
