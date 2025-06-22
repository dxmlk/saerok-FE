import { createBrowserRouter } from "react-router-dom";
import DexPage from "pages/DexPage.js";
import DexDetailPage from "pages/DexDetailPage.js";
import SearchDexPage from "pages/SearchDexPage.js";
import SearchBirdPage from "pages/SearchBirdPage.js";
import SaerokPage from "pages/SaerokPage.js";
import SaerokDetailPage from "pages/SaerokDetailPage.js";
import AddSaerokPage from "pages/AddSaerokPage.js";
import MapPage from "pages/MapPage.js";
import Layout from "components/common/Layout.js";
import SearchPlacePage from "pages/SearchPlacePage.js";
import OnboardingPage from "pages/OnboardingPage.js";
import KakaoCallback from "services/api/auth/KakaoCallback.js";
import RegisterPage from "pages/RegisterPage.js";
import MyPage from "pages/MyPage.js";
import ProtectedRoute from "components/common/ProtectedRoute.js";
import LoginPage from "pages/LoginPage.js";
import EditSaerokPage from "pages/EditSaerokPage.js";
import NotFoundPage from "pages/NotFoundPage.js";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "", element: <OnboardingPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "/auth/kakao/login", element: <KakaoCallback /> },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dex",
          element: <DexPage />,
        },
        {
          path: "/dex-detail/:id",
          element: <DexDetailPage />,
        },
        {
          path: "/saerok",
          element: <SaerokPage />,
        },
        {
          path: "/saerok-detail/:id",
          element: <SaerokDetailPage />,
        },
        {
          path: "/add-saerok",
          element: <AddSaerokPage />,
        },
        {
          path: "/edit-saerok/:id",
          element: (
            <ProtectedRoute>
              <EditSaerokPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/map",
          element: <MapPage />,
        },
        {
          path: "/myPage.js",
          element: <MyPage />,
        },
        {
          path: "/search/dex",
          element: <SearchDexPage />,
        },
        {
          path: "/search/bird",
          element: <SearchBirdPage />,
        },
        {
          path: "/search/place",
          element: <SearchPlacePage />,
        },

        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
};
