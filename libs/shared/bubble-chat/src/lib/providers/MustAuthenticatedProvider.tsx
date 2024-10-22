/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PropsWithChildren, useEffect } from "react";
import { getProfile } from "../utilities/api";
import { useRootContext } from "../context/RootContext";
import { screen } from "../configs/screenConfig";

export default function MustAuthenticatedProvider({children}: PropsWithChildren) {
  const rootContext = useRootContext();
 // Effect runs before render and handles authentication check
 useEffect(() => {
  const checkAuth = async () => {
    try {
      const abortController = new AbortController();
      await getProfile(rootContext!.apiHeaders, abortController.signal);
      // If getProfile succeeds, user is authenticated
    } catch (error) {
      // If getProfile fails, redirect to root
      // rootContext?.setActiveScreen(screen.REGISTER);
    }
  };

  checkAuth();
}, []); // Empty dependency array means this runs once on mount

  return children;
}
