import React from 'react'
import Header1 from './Header1'
import Footer from './Footer'

export default function Layout1({children}) {
    return (
        <>
           <Header1/>
           {children}
           <Footer/>
        </>
    )
}
