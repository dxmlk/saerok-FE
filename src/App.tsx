import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes/index";
import Provider from "./components/common/Provider";
import { AuthProvider } from "hooks/useAuth";

// 페이지 리로딩 시 스크롤 맨위로
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const App = () => {
  const router = createRouter();
  return (
    <AuthProvider>
      <Provider>
        <div className="max-w-480 w-full mx-auto min-h-[100dvh] bg-white">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </AuthProvider>
  );
};

export default App;
