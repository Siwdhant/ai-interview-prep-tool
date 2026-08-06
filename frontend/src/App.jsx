import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx";
import register from "./features/auth/pages/Register.jsx"; 
function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App