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
      </Routes>
    </Suspense>
  );
}
