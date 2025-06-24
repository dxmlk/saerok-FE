import { createBrowserRouter } from "react-router-dom";
import DexPage from "pages/DexPage";
import DexDetailPage from "pages/DexDetailPage";
import SearchDexPage from "pages/SearchDexPage";
import SearchBirdPage from "pages/SearchBirdPage";
import SaerokPage from "pages/SaerokPage";
import SaerokDetailPage from "pages/SaerokDetailPage";
import AddSaerokPage from "pages/AddSaerokPage";
import MapPage from "pages/MapPage";
import Layout from "components/common/Layout";
import SearchPlacePage from "pages/SearchPlacePage";
import OnboardingPage from "pages/OnboardingPage";
import KakaoCallback from "services/api/auth/KakaoCallback";
import RegisterPage from "pages/RegisterPage";
import MyPage from "pages/MyPage";
import ProtectedRoute from "components/common/ProtectedRoute";
import LoginPage from "pages/LoginPage";
import EditSaerokPage from "pages/EditSaerokPage";
import NotFoundPage from "pages/NotFoundPage";

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
          path: "/myPage",
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
      ],
    },
  ]);
};
