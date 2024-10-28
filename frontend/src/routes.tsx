import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import MainPage from "~/pages/MainPage.tsx";
import { PrivateLayout } from "./layout/PrivateLayout.tsx";
import { PublicDocuments } from "./pages/Documents/PublicDocuments";
import { UploadDocument } from "./pages/Documents/UploadDocument";
import { UserDocument } from "./pages/Documents/UserDocument";
import { Login } from "./pages/Login";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/publicDocuments",
        element: <PublicDocuments />,
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "uploadDocument",
            element: <UploadDocument />,
          },
          {
            path: "userDocument/:documentId",
            element: <UserDocument />,
          },
        ],
      },
    ],
  },
]);

export default router;
