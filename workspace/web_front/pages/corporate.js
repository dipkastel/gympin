import React from 'react'
import HomeTwoAbout from '../components/HomeTwo/HomeTwoAbout'
import HomeTwoFeature from '../components/HomeTwo/HomeTwoFeature'
import HomeTwoHero from '../components/HomeTwo/HomeTwoHero'
import HomeTwoVideo from '../components/HomeTwo/HomeTwoVideo'
import Layout from '../layouts/Layout'

export default function corporate() {
    return (
        <>
            <Layout>
                <HomeTwoHero/>
                <HomeTwoAbout/>
                <HomeTwoVideo/>
                <HomeTwoFeature/>
                {/*<HomeTwoService/>*/}
                {/*<HomeTwoWCU/>*/}
                {/*<HomeTwoWorkingProcess/>*/}
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
