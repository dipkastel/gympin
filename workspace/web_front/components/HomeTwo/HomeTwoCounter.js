import React from 'react'

export default function HomeTwoCounter() {
    return (
        <>
         {/* <!-- counter section start --> */}
    <div className="counter-area pb-130 blue-bg">
        <div className="container">
            <div className="row mt-none-40">
                <div className="col-xl-3 col-lg-6 col-md-6 mt-40">
                    <div className="counter-box text-center">
                        <div className="counter_box__icon">
                            <img src="/images/icons/c-1.png" alt=""/>
                        </div>
                        <h2 className="counter_box__title"><span className="odometer" >875</span></h2>
                        <p>Complete Work</p>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mt-40">
                    <div className="counter-box text-center">
                        <div className="counter_box__icon">
                            <img src="/images/icons/c-2.png" alt=""/>
                        </div>
                        <h2 className="counter_box__title"><span className="odometer" >245</span></h2>
                        <p>Expert Member</p>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mt-40">
                    <div className="counter-box text-center">
                        <div className="counter_box__icon">
                            <img src="/images/icons/c-3.png" alt=""/>
                        </div>
                        <h2 className="counter_box__title"><span className="odometer" >452</span></h2>
                        <p>Satisfied Client</p>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 mt-40">
                    <div className="counter-box text-center">
                        <div className="counter_box__icon">
                            <img src="/images/icons/c-4.png" alt=""/>
                        </div>
                        <h2 className="counter_box__title"><span className="odometer" >624</span></h2>
                        <p>Total Coffees</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- counter section end -->    */}
        </>
    )
}
