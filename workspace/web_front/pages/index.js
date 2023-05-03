import Image from 'next/image'
import HomeOneAbout from '../components/HomeOne/HomeOneAbout'
import HomeOneBrand from '../components/HomeOne/HomeOneBrand'
import HomeOneCTA from '../components/HomeOne/HomeOneCTA'
import HomeOneCTA2 from '../components/HomeOne/HomeOneCTA2'
import HomeOneFAQ from '../components/HomeOne/HomeOneFAQ'
import HomeOneFeature from '../components/HomeOne/HomeOneFeature'
import HomeOneGTA from '../components/HomeOne/HomeOneGTA'
import HomeOneHero from '../components/HomeOne/HomeOneHero'
import HomeOneNews from '../components/HomeOne/HomeOneNews'
import HomeOnePricing from '../components/HomeOne/HomeOnePricing'
import HomeOneProject from '../components/HomeOne/HomeOneProject'
import HomeOneService from '../components/HomeOne/HomeOneService'
import HomeOneTestimonial from '../components/HomeOne/HomeOneTestimonial'
import Layout from '../layouts/Layout'

export default function Home() {
    return (
        <>
            <Layout>
                <HomeOneHero />
                <HomeOneFeature />
                <HomeOneTestimonial />
                <HomeOneService />
                {/*<HomeOneProject />*/}
                {/*<HomeOnePricing />*/}
                {/*<HomeOneNews />*/}
                <HomeOneCTA />
                <HomeOneAbout />
                <HomeOneCTA2 />
                {/*<HomeOneGTA />*/}
                <HomeOneFAQ />
                {/*<HomeOneBrand />*/}
            </Layout>
        </>
    )
}
