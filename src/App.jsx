import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Singup from "./components/Singup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"


let router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route>
      <Route index element={<Singup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dash" element={<Dashboard />}></Route>
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
