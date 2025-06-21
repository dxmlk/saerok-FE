import { createBrowserRouter } from "react-router-dom";
import Test from "pages/Test";
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

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "", element: <OnboardingPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/test",
          element: <Test />,
        },
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
          element: (
            <ProtectedRoute>
              <SaerokDetailPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add-saerok",
          element: <AddSaerokPage />,
        },
        {
          path: "/map",
          element: <MapPage />,
        },
        {
          path: "/mypage",
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
          path: "/auth/kakao/login",
          element: <KakaoCallback />,
        },
      ],
    },
  ]);
};
