import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes/index.js";
import Provider from "./components/common/Provider.js";
import { AuthProvider } from "hooks/useAuth.js";

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
