import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import Index from "./pages/index";
import Employees from "./pages/employees"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Index />} />
            <Route path="employees" element={<Employees />} />
        </>
    )
);

export default router