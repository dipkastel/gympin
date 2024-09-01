import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { LayoutSplashScreen } from "../../helper";
import PlaceManagement from "./place/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import UserManagement from "./user/UserManagement";
import UserDetailsManagement from "./user/baseDate/UserDetailsManagement";
import MediaManagement from "./media/MediaManagement";
import MediaCategoryManagement from "./media/category/mediaCategoryManagement";
import EventManagement from "./unuse/event/EventManagement";
import PlaceDataManagement from "./place/baseData/PlaceDataManagement";
import MainPageManagement from "./mainPage/MainPageManagement";
import placeOptionsManagement from "./place/options/placeOptionsManagement";
import HallDataManagement from "./place/HallData/HallDataManagement";
import TicketSubscribeDataManagement from "./place/tickets/ticketSubscribe/TicketSubscribeDataManagement";
import HomePageDetail from "./mainPage/edit/HomePageDetail";
import HomePageTypes from "./mainPage/types/HomePageTypes";
import SettingsManagement from "./settings/SettingsManagement";
import CorporateManagement from "./corporate/CorporateManagement";
import Support from "./support/Support";
import SupportDetails from "./support/SupportDetails";
import CorporateDetailsManagement from "./corporate/baseData/CorporateDetailsManagement";
import CorporatePersonnelDetailsManagement from "./corporate/persoanel/CorporatePersonnelDetailsManagement";
import SubscribeDataManagement from "./purchasedItems/subscribes/baseData/SubscribeDataManagement";
import PlacePersonnelManagement from "./place/personnel/PlacePersonnelManagement";
import ArticlesManagement from "./articles/ArticlesManagement";
import SingleArticle from "./articles/SingleArticle/SingleArticle";
import Reports from "./report/Reports";
import ArticleCategories from "./articles/categories/ArticleCategories";
import PlacesMap from "./place/PlacesMap/PlacesMap";
import PlaceWizard from "./place/wizard/PlaceWizard";
import SportsManagement from "./sport/SportsManagement";
import InvoiceDetailManagement from "./invoice/invoiceDetails/InvoiceDetailManagement";
import InvoiceManagement from "./invoice/InvoiceManagement";
import SellsManagement from "./purchased/SellsManagement";
import TransactionManagement from "./finance/TransactionManagement";
import TicketCourseDataManagement from "./place/tickets/ticketCourse/TicketCourseDataManagement";
import CourseDataManagement from "./purchasedItems/courses/baseData/CourseDataManagement";
import CoachManagement from "./coach/CoachManagement";
import CoachDetailsManagement from "./coach/baseData/CoachDetailsManagement";
import LocationDetail from "./location/LocationDetail/LocationDetail";
import ProcessManagement from "./process/ProcessManagement";
import ProcessSerialDetail from "./process/detail/ProcessSerialDetail";
export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <Route path="/dashboard" component={Dashboard} />
        {/*place*/}
        <Route path="/place/data/:placeId" component={PlaceDataManagement} />
        <Route path="/place/hall/:hallId" component={HallDataManagement} />
        <Route path="/place/personnel/:personnelId" component={PlacePersonnelManagement} />
        <Route path="/place/placeOptionManagement" component={placeOptionsManagement} />
        <Route path="/place/placeOnMap" component={PlacesMap} />
        <Route path="/place/wizard/:placeId" component={PlaceWizard} />
        <Route path="/places" component={PlaceManagement} />
        {/*articles*/}
        <Route path="/articles/details/:articleId" component={SingleArticle} />
        <Route path="/articles/categories/" component={ArticleCategories} />
        <Route path="/articles" component={ArticlesManagement} />
        {/*home*/}
        <Route path="/homePage/edit/:ItemId" component={HomePageDetail} />
        <Route path="/homePage/types" component={HomePageTypes} />
        <Route path="/homePage/" component={MainPageManagement} />
        {/*Report*/}
        <Route path="/report" component={Reports} />
        {/*user*/}
        <Route path="/users/details/:userId" component={UserDetailsManagement} />
        <Route path="/users" component={UserManagement} />
        {/*coach*/}
        <Route path="/coach/details/:userId" component={CoachDetailsManagement} />
        <Route path="/coach" component={CoachManagement} />
        {/*support*/}
        <Route path="/support/details/:supportId" component={SupportDetails} />
        <Route path="/support" component={Support} />
        {/*corporate*/}
        <Route path="/corporate/details/:corporateId" component={CorporateDetailsManagement} />
        <Route path="/corporate/personnel/:personnelId" component={CorporatePersonnelDetailsManagement} />
        <Route path="/corporates" component={CorporateManagement} />
        {/*  sells */}
        <Route path="/sells/" component={SellsManagement} />
        {/*subscribes*/}
        <Route path="/place/ticketSubscribe/:ticketSubscribeId" component={TicketSubscribeDataManagement} />
        <Route path="/subscribe/data/:subscribeId" component={SubscribeDataManagement} />
        {/*course*/}
        <Route path="/place/ticketCourse/:ticketCourseId" component={TicketCourseDataManagement} />
        <Route path="/course/data/:courseId" component={CourseDataManagement} />
        {/*finance*/}
        <Route path="/FinanceTransactions" component={TransactionManagement} />
        {/*process*/}
        <Route path="/Process/detail/:serialId" component={ProcessSerialDetail} />
        <Route path="/Process" component={ProcessManagement} />
        {/* invoice */}
        <Route path="/invoice/detail/:invoiceId" component={InvoiceDetailManagement} />
        <Route path="/invoices" component={InvoiceManagement} />


        {/* location */}
        <Route path="/locations/:parentId" component={LocationManagement} />
        <Route path="/locations" component={LocationManagement} />
        <Route path="/location/:locationId" component={LocationDetail} />


        <Route path="/sports" component={SportsManagement} />
        <Route path="/media" component={MediaManagement} />
        <Route path="/events" component={EventManagement} />
        <Route path="/media-category" component={MediaCategoryManagement} />
        <Route path="/settings" component={SettingsManagement} />
        <Redirect to="/error/error" />
      </Switch>
    </Suspense>
  );
}
