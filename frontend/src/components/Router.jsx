import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../pages/User/auth/SignIn';
import SignUp from '../pages/User/auth/SignUp';
import OTPVerify from '../pages/User/auth/OTPVerify';
import MainPage from '../pages/User/MainPage';
import Test from '../pages/Test';
import Profile from '../pages/User/profiles/Profile';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/Admin/Login';
import Dashboard from '../pages/Admin/Dashboard';
import CategoryList from '../pages/Admin/Category/CategoryList';
import CategoryMaster from '../pages/Admin/Category/CategoryMaster';
import VideoList from '../pages/Admin/Videos/VideoList';
import VideoMaster from '../pages/Admin/Videos/VideoMaster';
import Sports from '../pages/User/Sports';
import ContentwiseVideoLists from '../pages/User/ContentwiseVideoLists';
import SubCategoryList from '../pages/Admin/SubCategory/SubCategoryList';
import SubCategoryMaster from '../pages/Admin/SubCategory/SubCategoryMaster';
import Movies from '../pages/User/Movies';
import SingleVideoDetailView from '../pages/User/SingleVideoDetailView';
import PlanUpgrade from '../pages/User/profiles/PlanUpgrade';
import TVShows from '../pages/User/TVShows';
import LanguageList from '../pages/Admin/Language/LanguageList';
import LanguageMaster from '../pages/Admin/Language/LanguageMaster';
import TVChannelList from '../pages/Admin/TVChannels/TVChannelList';
import TVChannelMaster from '../pages/Admin/TVChannels/TVChannelMaster';
import LanguagesVideos from '../pages/User/LanguagesVideos';
import TVChannelVideos from '../pages/User/TVChannelVideos';
import TVShowsList from '../pages/Admin/TVShows/TVShowsList';
import TVShowsMaster from '../pages/Admin/TVShows/TVShowsMaster';
import TVShowsContentList from '../pages/User/TVShowsContentList';
import SeasonsTVShows from '../pages/User/SeasonsTVShows';
import WebSeries from '../pages/User/WebSeries';
import AllShowsList from '../pages/Admin/AllShows/AllShowsList';
import AllShowsMaster from '../pages/Admin/AllShows/AllShowsMaster';

const Router = createBrowserRouter([
    // USER SIDE
    {
        element : <GuestLayout/>,
        children : [
            { path : '/sign-in', element : <SignIn/> },
            { path : '/sign-up', element : <SignUp/> },
            { path : '/otp-verification', element : <OTPVerify/> },
        ]
    },
    {
        element : <MainLayout/>,
        children : [
            { path : '/', element : <MainPage/> },
            { path : '/profile', element : <Profile/> },
            { path : '/tv-shows', element : <TVShows/> },
            { path : '/movies', element : <Movies/> },
            { path : '/sports', element : <Sports/> },
            { path : '/web-series', element : <WebSeries/> },
            { path : '/:category/:subCategorySlug', element : <ContentwiseVideoLists/> },
            { path : '/:category/:subCategorySlug/:contentSlug', element : <SingleVideoDetailView/> },
            { path : '/plan-upgrade', element : <PlanUpgrade/> },
            { path : '/:category/language/:language', element : <LanguagesVideos/> },
            { path : '/:category/tv-channel/:tvChannel', element : <TVChannelVideos/> },
            { path : '/:category/videos/:tvShows', element : <TVShowsContentList/> },
            { path : '/:category/:tvShows/season/:season', element : <SeasonsTVShows/> },
            { path : '/test', element : <Test/> },
        ]
    },

    // ADMIN SIDE
    { path : '/admin/login', element : <Login/> },
    {
        element : <AdminLayout/>,
        children : [
            { path : '/admin/dashboard', element : <Dashboard/> },

            { path : '/admin/categories', element : <CategoryList/> },
            { path : '/admin/categories/add-new-category', element : <CategoryMaster/> },

            { path : '/admin/subcategories', element : <SubCategoryList/> },
            { path : '/admin/subcategories/add-new-sub-category', element : <SubCategoryMaster/> },

            { path : '/admin/languages', element : <LanguageList/> },
            { path : '/admin/languages/add-new-language', element : <LanguageMaster/> },

            { path : '/admin/tv-channel', element : <TVChannelList/> },
            { path : '/admin/tv-channel/add-new-tv-channel', element : <TVChannelMaster/> },

            { path : '/admin/tv-shows', element : <TVShowsList/> },
            { path : '/admin/tv-shows/add-new-tv-shows', element : <TVShowsMaster/> },

            { path : '/admin/shows', element : <AllShowsList/> },
            { path : '/admin/shows/add-new-shows', element : <AllShowsMaster/> },

            { path : '/admin/videos', element : <VideoList/> },
            { path : '/admin/videos/add-new-video', element : <VideoMaster/> },
        ]
    }
]);

export default Router;