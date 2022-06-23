import React, { useState } from 'react'

export default function FAQArea() {
    const [activeDefault, setActiveDefault] = useState(0);
    const FAQ = [
        {
            q: " Would you replace my developer if I am not satisfied with the performance?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: "Is testing incorporated as a component within your pricing structure?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: "Can I define and enforce our coding standards on your developers?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: "  Are my business secrets and information safe with your company?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: " Would you replace my developer if I am not satisfied with the performance?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: " Do you provide technical support and maintenance?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: " What types of Shipping Service do you offer?",
            a: "Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        }

    ]
    return (
        <>
            {/* <!-- faq section start --> */}
            <section className="faq-area faq-area__2 pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 text-center">
                            <div className="section-header mb-75">
                                <h4 className="sub-heading sub-heading__2 mb-15">
                                    <span><img src="/images/shape/heading-shape-3.png" className="mr-5" alt="" /></span>
                                    Common Question
                                    <span><img src="/images/shape/heading-shape-4.png" className="ml-5" alt="" /></span>
                                </h4>
                                <h2 className="section-title section-title__2">Asked Questions</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="accordion faqs faqs__2" id="accordionFaq">
                                {FAQ.map((d, i) => (
                                    <div className="card">
                                        <div onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className="card__header" id="heading1">
                                            <h5 className="mb-0 title">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                    data-target="#collapse1" aria-expanded={activeDefault === i ?"true" :"false"} aria-controls="collapse1">
                                                    {d.q}
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapse1" className={`collapse ${activeDefault === i ? "show" : ""}`} aria-labelledby="heading1" data-parent="#accordionFaq">
                                            <div className="card__body">
                                                <p>{d.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- faq section end -->    */}
        </>
    )
}
