import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/MainLayout/index';
import Loading from '@/components/Loading';

// lazy로 변경
const Home = lazy(() => import('@/pages/Home/index'));
const SignUp = lazy(() => import('@/pages/Signup/index'));
const SignIn = lazy(() => import('@/pages/Signin/index'));
const WinesList = lazy(() => import('@/pages/WinesList/index'));
const WineDetail = lazy(() => import('@/pages/WineDetail/index'));
const AddItem = lazy(() => import('@/pages/AddItem/index'));
const MyProfile = lazy(() => import('@/pages/MyProfile/index'));
const KakaoCallback = lazy(() => import('@/pages/KakaoCallback'));

import DropdownSample from '@/storybook/drop-down';
import WineTasteSliderStorybook from '@/storybook/wine-taste-silder';
import ImageAddButton from '@/storybook/img-add-btn';
import Button from '@/storybook/button';
import LinkButton from '@/storybook/link-button';

import Input from '@/storybook/input';
import AromaStoryBook from '@/storybook/aroma';

import ModalTestPage from '@/storybook/Modal';
import ModalConfirmTestPage from '@/storybook/ModalConfirm';

import WineTypeTestPage from '@/storybook/wine-type';
import CheckBoxStory from '@/storybook/checkbox';
import TextareaTestPage from '@/storybook/textarea';
import SearchBarSample from '@/storybook/search-bar';
import PriceRangeSlider from '@/storybook/price-range-slider';
import AuthTest from '@/storybook/auth-test';
import StarRatingTestPage from '@/storybook/rating';

import ProFileTestPage from '@/storybook/profile';
import ProFileSmallTestPage from '@/storybook/profilesmall';
import ReviewCardStorybook from '@/storybook/review-card';

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<WinesList />} />
          <Route path="/wines/:id" element={<WineDetail />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/oauth/kakao" element={<KakaoCallback />} />

        <Route path="/storybook/rating" element={<StarRatingTestPage />} />
        <Route path="/storybook/auth-test" element={<AuthTest />} />
        <Route path="/storybook/dropdown" element={<DropdownSample />} />
        <Route
          path="/storybook/review-card"
          element={<ReviewCardStorybook />}
        />
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
          path="/storybook/modalconfirm"
          element={<ModalConfirmTestPage />}
        />

        <Route path="/storybook/checkbox" element={<CheckBoxStory />} />
        <Route path="/storybook/textarea" element={<TextareaTestPage />} />
        <Route path="/storybook/search-bar" element={<SearchBarSample />} />
        <Route path="/storybook/profile" element={<ProFileTestPage />} />
        <Route
          path="/storybook/profilesmall"
          element={<ProFileSmallTestPage />}
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Suspense>
  );
}
