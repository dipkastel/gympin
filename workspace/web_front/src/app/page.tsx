import {JSX} from "react";
import HeroSlider from "../components/sections/HeroSlider";
import IntroSection from "@/components/sections/IntroSection";
import ExcitingTexts from "@/components/sections/ExcitingTexts";
import RedAdditionalData from "@/components/sections/RedAdditionalData";
import CorporateVideo from "@/components/sections/CorporateVideo";
import TextBox from "@/components/sections/TextBox";
import Boxes from "@/components/sections/Boxes";
import ValuesTicker from "@/components/sections/ValuesTicker";
import OurGoals from "@/components/sections/OurGoals";
import CorporateForm from "@/components/sections/CorporateForm";
import Apps from "@/components/sections/Apps";
import Sports from "@/components/sections/Sports";
import HomeContact from "@/components/sections/HomeContact";
import HomeFaq from "@/components/sections/HomeFaq";

export const metadata = {
    alternates: { canonical: "/" },
};

export default function HomePage():JSX.Element {

    return (
        <div>

            <HeroSlider />
            <IntroSection />
            <ExcitingTexts />
            <RedAdditionalData />
            <Sports />
            <TextBox />
            <Boxes />
            <ValuesTicker />
            <OurGoals />
            <CorporateVideo />
            <CorporateForm />
            <Apps />
            <HomeFaq />
            <HomeContact />
        </div>
    );
}
