import Image from 'next/image'
import HomeOneAbout from '../components/HomeOne/HomeOneAbout'
import HomeOneBrand from '../components/HomeOne/HomeOneBrand'
import HomeOneCTA from '../components/HomeOne/HomeOneCTA'
import HomeOneFAQ from '../components/HomeOne/HomeOneFAQ'
import HomeOneFeature from '../components/HomeOne/HomeOneFeature'
import HomeOneGTA from '../components/HomeOne/HomeOneGTA'
import HomeOneHero from '../components/HomeOne/HomeOneHero'
import HomeOneNews from '../components/HomeOne/HomeOneNews'
import HomeOnePricing from '../components/HomeOne/HomeOnePricing'
import HomeOneProject from '../components/HomeOne/HomeOneProject'
import HomeOneService from '../components/HomeOne/HomeOneService'
import HomeOneTestimonial from '../components/HomeOne/HomeOneTestimonial'
import Layout1 from '../layouts/Layout1'

export default function Home() {
    return (
        <>
            <Layout1>
                <HomeOneHero />
                {/*<HomeOneFeature />*/}
                <HomeOneAbout />
                {/*<HomeOneProject />*/}
                <HomeOneService />
                <HomeOneTestimonial />
                {/*<HomeOnePricing />*/}
                <HomeOneNews />
                <HomeOneCTA />
                <HomeOneGTA />
                <HomeOneFAQ />
                {/*<HomeOneBrand />*/}
            </Layout1>
        </>
    )
}
