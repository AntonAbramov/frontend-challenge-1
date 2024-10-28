import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Loader } from "~/components/Loader.tsx";
import userStore from "~/store/userStore.ts";

export const PrivateLayout = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.user && !userStore.pending) {
      navigate("/login", { replace: true });
    }
  }, [userStore.user, userStore.pending]);

  return (
    <>
      {userStore.pending && <Loader />}
      {userStore.user && !userStore.pending && <Outlet />}
    </>
  );
});
