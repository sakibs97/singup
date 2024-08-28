import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Singup from "./components/Singup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Forget from "./components/Forget"
import NewPassword from "./components/NewPassword"


let router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route>
      <Route index element={<Singup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dash" element={<Dashboard />}></Route>
      <Route path="/forget" element={<Forget />}></Route>
      <Route path="/reset-password" element={<NewPassword />}></Route>
    </Route>
  </>
))

function App() {


  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
