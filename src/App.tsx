import { RouterProvider } from "react-router-dom";
import { createRouter } from "routes";
import Provider from "./components/common/Provider";
import Layout from "components/common/Layout";

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
