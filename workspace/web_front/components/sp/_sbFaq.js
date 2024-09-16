import React, {useState} from 'react';
import {faq_sources} from "../faq_sources";
import {faq_places} from "../faq_places";

const _sbFaq = () => {
    const [activeDefault, setActiveDefault] = useState(0);
    return (
        <>
            {/* <!-- faq section start --> */}
            <section className="pt-0 pb-80 rtl">
                <div className="container">
                    <div className="row">
                        <div className="">
                            <div className="section-header mb-25">
                                <h4 className="sub-heading mb-15">سوالات متداول</h4>
                            </div>
                            <div className="accordion faqs" id="accordionFaq">
                                {faq_places.slice(0,5).map((d, i) => (
                                    <div className="card" key={i}>
                                        <div onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className="card__header" id="heading1">
                                            <h5 className="mb-0 title">
                                                <button onClick={() => setActiveDefault(activeDefault === i ? -1 : i)} className={activeDefault === i ? "btn btn-link collapsed" : "btn btn-link"} type="button" data-toggle="collapse"
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
                    <div>
                        <a href="/faq" className="site-btn site-btn__s2 mt-55 ltr"><span className="icon icon__black"><i
                            className="far fa-arrow-left"></i></span>سوالات دیگری دارید</a>
                    </div>
                </div>

            </section>
            {/* <!-- faq section end -->    */}
        </>
    )
};

export default _sbFaq;
