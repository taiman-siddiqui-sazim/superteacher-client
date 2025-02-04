import { useEffect } from "react";
import { PropsWithChildren } from "react";

import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";

import { AppInitializerContext } from "./AppInitializerContext";

const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [getMe, { isLoading, error, data }] = useLazyMeQuery();

  useEffect(() => {
    getMe()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
      });
  }, [dispatch, getMe]);

  return (
    <AppInitializerContext.Provider value={{ isLoading, error, user: data, getMe }}>
      {children}
    </AppInitializerContext.Provider>
  );
};

export default AppInitializer;
