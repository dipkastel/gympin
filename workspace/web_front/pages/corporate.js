import React from 'react'
import HomeTwoAbout from '../components/HomeTwo/HomeTwoAbout'
import HomeTwoFeature from '../components/HomeTwo/HomeTwoFeature'
import HomeTwoHero from '../components/HomeTwo/HomeTwoHero'
import HomeTwoVideo from '../components/HomeTwo/HomeTwoVideo'
import Layout from '../layouts/Layout'
import HomeTwoService from "../components/HomeTwo/HomeTwoService";
import HomeTwoWCU from "../components/HomeTwo/HomeTwoWCU";
import HomeTwoWorkingProcess from "../components/HomeTwo/HomeTwoWorkingProcess";

export default function corporate() {
    return (
        <>
            <Layout>
                <HomeTwoHero/>
                <HomeTwoWorkingProcess/>
                <HomeTwoAbout/>
                <HomeTwoVideo/>
                {/*<HomeTwoFeature/>*/}
                {/*<HomeTwoService/>*/}
                {/*<HomeTwoWCU/>*/}
                {/*<HomeTwoTestimonial/>*/}
                {/*<HomeTwoCounter/>*/}
                {/*<HomeTwoProject/>*/}
                {/*<HomeTwoBrand/>*/}
                {/*<HomeTwoTeam/>*/}
                {/*<HomeTwoNews/>*/}
            </Layout>
        </>
    )
}
