import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "../Components/AdminPage";
import UserPAge from "../Components/UserPage";
import Layout from "../Components/Layout";
import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";

const route=createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/register',
                element:<RegisterPage/>
            },
            {
                path:'/',
                element:<LoginPage/>
            },
            
            {
                path:'/admin',
                element:<AdminPage/>
            },
            {
                path:'/admin',
                element:<AdminPage/>
            },
            {
                path:'/user',
                element:<UserPAge/>
            }
        ]
    }
])

const Router=()=>{
    return <RouterProvider router={route}/>
};
export default Router