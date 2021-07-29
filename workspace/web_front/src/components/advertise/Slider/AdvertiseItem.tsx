import React from "react";

export default function AdvertiseItem(items:any){
        var item = items.children;
        return (
            <div key={item.id}>
                <section className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="slider-text">
                        <h2><a href="">{item.title}</a></h2>
                        <span className="location">{item.location}</span>
                        <div className="meta">
                            <span className="time">زمان باقی مانده : <b>{item.time}</b> روز</span>
                            <span className="buy">{item.sellCount} عدد فروخته شده</span>
                            <div className="c100 p23 small">
                                <span>{item.sellPercent}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                        <span className="desc">{item.desc}</span>
                        <div className="more">
                            <div className="br">
                                <span className="t1 hidden-xs">پرداختی شما</span>
                                <div className="prices">
                                    <span className="t2 hidden-xs">{item.price}</span>
                                    <span className="t3">{item.sellPrice}</span>
                                </div>
                                <span className="t1">تومان</span>
                            </div>
                            <a href="" className="bl">
                                <span className="moree">مشاهده جزییات و خرید</span>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="slider-image">
                        <img src={item.imageSrc} />
                    </div>
                </section>
            </div>

        )
}
