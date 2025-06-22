import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes/index";
import Provider from "./components/common/Provider";
import { AuthProvider } from "hooks/useAuth";

const App = () => {
  const router = createRouter();
  return (
    <AuthProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  );
};

export default App;
