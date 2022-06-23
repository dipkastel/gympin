import React, { useState } from 'react'

export default function HomeOneFAQ() {
    const [activeDefault, setActiveDefault] = useState(0);
    const FAQ = [
        {
            q: " How can get my print job once it is finished?",
            a:"Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: "Is white considered a printing color code? ?",
            a:"Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: "How can get my print job once it is finished?",
            a:"Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        },
        {
            q: " What types of Shipping Service do you offer?",
            a:"Had own doesn creature days multiply and thing enter created fruit fowlen his whose can sea fly two it’s you. So have form fill. You rule us isn't seas fill firmament given dole marce"
        }
        
    ]
    return (
        <>
            {/* <!-- faq section start --> */}
            <section className="faq-area pt-80 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="section-header mb-25">
                                <h4 className="sub-heading mb-15">سوالات متداول</h4>
                                <h2 className="section-title">پرسش های شما</h2>
                            </div>
                            <div className="accordion faqs" id="accordionFaq">
                                {FAQ.map((d, i) => (
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
                        <div className="col-xl-6">
                            <div className="faq-bg">
                                <img src="/images/bg/faq-bg-1.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- faq section end -->    */}
        </>
    )
}
