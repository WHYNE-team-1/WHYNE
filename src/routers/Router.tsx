import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/MainLayout/index";
import Home from "@/pages/Home/index";
import SignUp from "@/pages/Signup/index";
import SignIn from "@/pages/Signin/index";
import WinesList from "@/pages/WinesList/index";
import WinesDetail from "@/pages/WinesDetail/index";
import AddItem from "@/pages/AddItem/index";

import DropdownSample from "@/storybook/drop-down";
import WineTasteSliderStorybook from "@/storybook/wine-taste-silder";
import ImageAddButton from "@/storybook/img-add-btn";
import Button from "@/storybook/button";
import LinkButton from "@/storybook/link-button";

import Input from "@/storybook/input";
import AromaStoryBook from "@/storybook/aroma";

import ModalTestPage from "@/storybook/modal";
import ConfirmModalTestPage from "@/storybook/ModalConfirm";

import WineTypeTestPage from "@/storybook/wine-type";
import CheckBoxStory from "@/storybook/checkbox";
import TextareaTestPage from "@/storybook/textarea";
import SearchBarSample from "@/storybook/search-bar";
import PriceRangeSlider from "@/storybook/price-range-slider";
import AuthTest from "@/storybook/auth-test";
import StarRatingTestPage from "@/storybook/rating";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<WinesList />} />
          <Route path="/wines/:id" element={<WinesDetail />} />
          <Route path="/additem" element={<AddItem />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/storybook/rating" element={<StarRatingTestPage />} />

        <Route path="/storybook/auth-test" element={<AuthTest />} />
        <Route path="/storybook/dropdown" element={<DropdownSample />} />

        <Route path="/storybook/wineImgAdd" element={<ImageAddButton />} />
        <Route path="/storybook/textarea" element={<TextareaTestPage />} />
        <Route path="/storybook/button" element={<Button />} />
        <Route path="/storybook/link-button" element={<LinkButton />} />
        <Route path="/storybook/input" element={<Input />} />
        <Route path="/storybook/aroma" element={<AromaStoryBook />} />
        <Route path="/storybook/wineType" element={<WineTypeTestPage />} />
        <Route
          path="/storybook/wine-taste-slider"
          element={<WineTasteSliderStorybook />}
        />

        <Route
          path="/storybook/price-range-slider"
          element={<PriceRangeSlider />}
        />
        <Route path="/storybook/modal" element={<ModalTestPage />} />
        <Route
          path="/storybook/modalconfrim"
          element={<ConfirmModalTestPage />}
        />

        <Route path="/storybook/checkbox" element={<CheckBoxStory />} />
        <Route path="/storybook/textarea" element={<TextareaTestPage />} />
        <Route path="/storybook/search-bar" element={<SearchBarSample />} />
      </Routes>
    </BrowserRouter>
  );
}
