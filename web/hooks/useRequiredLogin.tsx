import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { errorNotify } from "lib/notify";
import { useSignUpMutation } from "lib/generated/client";

interface Props {
  redirectUri: string | null;
}

export function useRequiredLogin({ redirectUri }: Props) {
  const [state, setState] = useState({ isSignIn: false });
  const { isAuthenticated, isLoading } = useAuth0();
  const [signUp, mutationResult] = useSignUpMutation({});
  const router = useRouter();

  useEffect(() => {
    const f = async () => {
      if (router.pathname === "/") return;
      if (isLoading) return;
      if (!isAuthenticated) {
        await router.push("/");
        return;
      }
      if (redirectUri) {
        await router.push(redirectUri);
        return;
      }
      if (!state.isSignIn) {
        await signUp({
          variables: {
            input: {},
          },
        });
        setState({ isSignIn: true });
        if (mutationResult.error) {
          errorNotify(`Failed sign in. Please browser reload.`);
          await router.push("/");
        }
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);
}
