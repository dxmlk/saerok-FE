import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes";
import Provider from "./components/common/Provider";

const App = () => {
  const router = createRouter();
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
