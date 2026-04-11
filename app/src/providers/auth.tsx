import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { signup } from "../api/actions/signup/signup";
import { useSignup } from "../api/actions/signup/useSignup";
import { toast } from "sonner";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthProviderValue = {
  // Methods
  // eslint-disable-next-line no-unused-vars
  signup: (data: Parameters<typeof signup>[0]) => void;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { mutate: signupUser } = useSignup();

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

  return (
    <AuthContext.Provider value={{ signup: signupAction }}>
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
      signup: authContext.signup,
    };

    return auth;
  }, [authContext]);

  return auth;
};
