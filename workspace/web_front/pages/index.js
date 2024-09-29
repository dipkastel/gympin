import HomeOneAbout from '../components/HomeOne/HomeOneAbout'
import HomeOneCTA from '../components/HomeOne/HomeOneCTA'
import HomeOneFAQ from '../components/HomeOne/HomeOneFAQ'
import HomeOneHero from '../components/HomeOne/HomeOneHero'
import Layout from '../layouts/Layout'
import HomeOneTestimonial2 from "../components/HomeOne/HomeOneTestimonial2";
import HomeOneGoal from "../components/HomeOne/HomeOneGoal";
import HomeOneDesc1 from "../components/HomeOne/HomeOneDesc1";
import HomeOneDesc2 from "../components/HomeOne/HomeOneDesc2";
import HomeOneApplications from "../components/HomeOne/HomeOneApplications";

export default function Home() {
    return (
        <>
            <Layout>
                <HomeOneHero/>
                <HomeOneTestimonial2/>
                <HomeOneGoal/>
                <HomeOneDesc1/>
                <HomeOneDesc2/>
                <HomeOneCTA/>
                <HomeOneAbout/>
                <HomeOneApplications/>
                {/*<HomeOneFeature />*/}
                {/*<HomeOneTestimonial />*/}
                {/*<HomeOneService />*/}
                {/*<HomeOneProject />*/}
                {/*<HomeOnePricing />*/}
                {/*<HomeOneNews />*/}
                {/*<HomeOneCTA2 />*/}
                {/*<HomeOneGTA />*/}
                <HomeOneFAQ/>
                {/*<HomeOneBrand />*/}
            </Layout>
        </>
    )
}
