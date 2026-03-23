import AppRoutes from "./routers/Router";
import { setAuth } from "./utils/auth";
function App() {
  setAuth();
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
