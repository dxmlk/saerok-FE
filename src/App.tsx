import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes";
import Layout from "components/common/Layout";
import Provider from "./components/common/Provider";

const App = () => {
  const router = createRouter();
  return (
    <Provider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  );
};

export default App;
