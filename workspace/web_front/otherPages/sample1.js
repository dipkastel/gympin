import React from 'react';
import Layout from "../layouts/Layout";
import EventsBreadcrumb from "../components/Events/EventsBreadcrumb";
import EventsArea from "../components/Events/EventsArea";
import AboutBreadcrumb from "../components/About/AboutBreadcrumb";
import AboutSection from "../components/About/AboutSection";
import AboutVideo from "../components/About/AboutVideo";
import AboutCounter from "../components/About/AboutCounter";
import AboutWCU from "../components/About/AboutWCU";
import HomeOneTestimonial2 from "../components/HomeOne/HomeOneTestimonial2";
import AboutTeam from "../components/About/AboutTeam";
import AboutBrand from "../components/About/AboutBrand";
import PricingBreadcrumb from "../components/Pricing/PricingBreadcrumb";
import PricingSection from "../components/Pricing/PricingSection";
import ProjectBreadcrumb from "../components/Project/ProjectBreadcrumb";
import ProjectSection from "../components/Project/ProjectSection";
import ProjectBrand from "../components/Project/ProjectBrand";
import ProjectCTA from "../components/Project/ProjectCTA";
import ProjectDetailsBreadCrumb from "../components/ProjectDetails/ProjectDetailsBreadCrumb";
import ProjectDetailsArea from "../components/ProjectDetails/ProjectDetailsArea";
import ServiceBreadcrumb from "../components/Service/ServiceBreadcrumb";
import ServiceFeature from "../components/Service/ServiceFeature";
import ServiceSection from "../components/Service/ServiceSection";
import ServiceBrand from "../components/Service/ServiceBrand";
import ServiceWorkingProgres from "../components/Service/ServiceWorkingProgres";
import ServiceStrategy from "../components/Service/ServiceStrategy";
import ServicePricing from "../components/Service/ServicePricing";
import ServiceDetailBreadcrumb from "../components/ServiceDetails/ServiceDetailBreadcrumb";
import ServiceDetailsContent from "../components/ServiceDetails/ServiceDetailsContent";
import TeamBreadcrumb from "../components/Team/TeamBreadcrumb";
import TeamSection from "../components/Team/TeamSection";
import TeamVideo from "../components/Team/TeamVideo";
import TeamGTA from "../components/Team/TeamGTA";
import TeamDetailsBreadcrumb from "../components/TeamDetails/TeamDetailsBreadcrumb";
import TeamDetailsContent from "../components/TeamDetails/TeamDetailsContent";
import VenuesBreadcrumb from "../components/Venues/VenuesBreadcrumb";
import VenuesArea from "../components/Venues/VenuesArea";

export default function sample1() {
    return (
        <>
            <Layout>
                <EventsBreadcrumb />
                <EventsArea />

                <AboutBreadcrumb/>
                <AboutSection/>
                <AboutVideo/>
                <AboutCounter/>
                <AboutWCU/>
                <HomeOneTestimonial2/>
                <AboutTeam/>
                <AboutBrand/>

                <PricingBreadcrumb />
                <PricingSection />

                <ProjectBreadcrumb />
                <ProjectSection />
                <ProjectBrand />
                <ProjectCTA />

                <ProjectDetailsBreadCrumb />
                <ProjectDetailsArea />

                <ServiceBreadcrumb />
                <ServiceFeature/>
                <ServiceSection/>
                <ServiceBrand/>
                <ServiceWorkingProgres/>
                <ServiceStrategy/>
                <ServicePricing/>

                <ServiceDetailBreadcrumb />
                <ServiceDetailsContent />

                <TeamBreadcrumb />
                <TeamSection />
                <TeamVideo />
                <TeamGTA />

                <TeamDetailsBreadcrumb />
                <TeamDetailsContent />

                <VenuesBreadcrumb />
                <VenuesArea />
            </Layout>
        </>
    )
}
