import React from 'react';
import Layout from "../layouts/Layout";
import _spBreadcrumb from "../components/sp/_spBreadcrumb";

import _sbDescribe from "../components/sp/_sbDescribe";
import _sbFaq from "../components/sp/_sbFaq";
import TeamGTA from "../components/Team/TeamGTA";

const sp = () => {
    return (
        <>
            <Layout>
                <_spBreadcrumb/>
                <_sbDescribe />
                <_sbFaq />

                <TeamGTA />
            </Layout>
        </>
    );
};

export default sp;
