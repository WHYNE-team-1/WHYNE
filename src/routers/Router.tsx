import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/MainLayout/index";
import Home from "@/pages/Home/index";
import SignUp from "@/pages/Signup/index";
import SignIn from "@/pages/Signin/index";
import List from "@/pages/List/index";
import AddItem from "@/pages/AddItem/index";
import TextareaTestPage from "@/storybook/textarea";
import Button from "@/storybook/button";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<List />} />
          <Route path="/additem" element={<AddItem />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/storybook/textarea" element={<TextareaTestPage />} />
        <Route path="/storybook/button" element={<Button />} />
      </Routes>
    </BrowserRouter>
  );
}
