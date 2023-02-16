import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { LayoutSplashScreen } from "../../helper";
import PlaceManagement from "./place/PlaceManagement";
import LocationManagement from "./location/LocationManagement";
import SportManagement from "./sport/SportManagement";
import UserManagement from "./user/UserManagement";
import UserDetailsManagement from "./user/baseDate/UserDetailsManagement";
import MediaManagement from "./media/MediaManagement";
import MediaCategoryManagement from "./media/category/mediaCategoryManagement";
import EventManagement from "./unuse/event/EventManagement";
import PlaceDataManagement from "./place/baseData/PlaceDataManagement";
import MainPageManagement from "./mainPage/MainPageManagement";
import placeOptionsManagement from "./place/options/placeOptionsManagement";
import GateDataManagement from "./place/GateData/GateDataManagement";
import PlanDataManagement from "./place/planData/PlanDataManagement";
import HomePageDetail from "./mainPage/edit/HomePageDetail";
import HomePageTypes from "./mainPage/types/HomePageTypes";
import SettingsManagement from "./settings/SettingsManagement";
import CorporateManagement from "./corporate/CorporateManagement";
import Support from "./support/Support";
import SupportDetails from "./support/SupportDetails";
import CorporateDetailsManagement from "./corporate/baseData/CorporateDetailsManagement";
import CorporatePersonnelDetailsManagement from "./corporate/persoanel/CorporatePersonnelDetailsManagement";
import TicketsManagement from "./tickets/TicketsManagement";
import TicketDataManagement from "./tickets/baseData/TicketDataManagement";
import FinanceManagement from "./finance/FinanceManagement";
import PlacePersonnelManagement from "./place/personnel/PlacePersonnelManagement";
import ArticlesManagement from "./articles/ArticlesManagement";
import SingleArticle from "./articles/SingleArticle/SingleArticle";
export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <Route path="/dashboard" component={Dashboard} />
        {/*place*/}
        <Route path="/place/data/:placeId" component={PlaceDataManagement} />
        <Route path="/place/gate/:gateId" component={GateDataManagement} />
        <Route path="/place/plan/:planId" component={PlanDataManagement} />
        <Route path="/place/personnel/:personnelId" component={PlacePersonnelManagement} />
        <Route path="/place/placeOptionManagement" component={placeOptionsManagement} />
        <Route path="/places" component={PlaceManagement} />
        {/*articles*/}
        <Route path="/articles" component={ArticlesManagement} />
        <Route path="/singlearticle/:articleId" component={SingleArticle} />
        {/*home*/}
        <Route path="/homePage/edit/:ItemId" component={HomePageDetail} />
        <Route path="/homePage/types" component={HomePageTypes} />
        <Route path="/homePage/" component={MainPageManagement} />
        {/*user*/}
        <Route path="/users/details/:userId" component={UserDetailsManagement} />
        <Route path="/users" component={UserManagement} />
        {/*support*/}
        <Route path="/support/details/:supportId" component={SupportDetails} />
        <Route path="/support" component={Support} />
        {/*corporate*/}
        <Route path="/corporate/details/:corporateId" component={CorporateDetailsManagement} />
        <Route path="/corporate/personnel/:personnelId" component={CorporatePersonnelDetailsManagement} />
        <Route path="/corporates" component={CorporateManagement} />
        {/*tickets*/}
        <Route path="/ticket/data/:ticketId" component={TicketDataManagement} />
        <Route path="/tickets" component={TicketsManagement} />
        {/*finance*/}
        <Route path="/finance" component={FinanceManagement} />

        <Route path="/locations/:parentId" component={LocationManagement} />
        <Route path="/locations" component={LocationManagement} />
        <Route path="/sports" component={SportManagement} />
        <Route path="/media" component={MediaManagement} />
        <Route path="/events" component={EventManagement} />
        <Route path="/media-category" component={MediaCategoryManagement} />
        <Route path="/settings" component={SettingsManagement} />
        <Redirect to="/error/error" />
      </Switch>
    </Suspense>
  );
}
