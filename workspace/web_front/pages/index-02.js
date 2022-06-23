import React from 'react'
import HomeTwoAbout from '../components/HomeTwo/HomeTwoAbout'
import HomeTwoBrand from '../components/HomeTwo/HomeTwoBrand'
import HomeTwoCounter from '../components/HomeTwo/HomeTwoCounter'
import HomeTwoFeature from '../components/HomeTwo/HomeTwoFeature'
import HomeTwoHero from '../components/HomeTwo/HomeTwoHero'
import HomeTwoProject from '../components/HomeTwo/HomeTwoProject'
import HomeTwoService from '../components/HomeTwo/HomeTwoService'
import HomeTwoTeam from '../components/HomeTwo/HomeTwoTeam'
import HomeTwoTestimonial from '../components/HomeTwo/HomeTwoTestimonial'
import HomeTwoVideo from '../components/HomeTwo/HomeTwoVideo'
import HomeTwoWCU from '../components/HomeTwo/HomeTwoWCU'
import HomeTwoWorkingProcess from '../components/HomeTwo/HomeTwoWorkingProcess'
import HomeTwoNews  from '../components/HomeTwo/HomeTwoNews'
import Layout1 from '../layouts/Layout1'

export default function index2() {
    return (
        <>
            <Layout1>
                <HomeTwoHero/>
                <HomeTwoAbout/>
                <HomeTwoFeature/>
                <HomeTwoVideo/>
                <HomeTwoService/>
                <HomeTwoWCU/>
                <HomeTwoWorkingProcess/>
                <HomeTwoTestimonial/>
                <HomeTwoCounter/>
                <HomeTwoProject/>
                <HomeTwoBrand/>
                <HomeTwoTeam/>
                <HomeTwoNews/>
            </Layout1>
        </>
    )
}
