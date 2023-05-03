import React, { useState } from 'react'
import {faq_sources} from "../faq_sources";

export default function FAQArea() {
    const [activeDefault, setActiveDefault] = useState(0);
    return (
        <>
            {/* <!-- faq section start --> */}
            <section className="faq-area faq-area__2 pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 text-center">
                            <div className="section-header mb-75">
                                <h2 className="section-title section-title__2">سوالات کاربران</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="accordion faqs faqs__2" id="accordionFaq">
                                {faq_sources.map((d, i) => (
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
