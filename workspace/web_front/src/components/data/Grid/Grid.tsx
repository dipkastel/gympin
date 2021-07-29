import React, {Component} from 'react'
import AdvertiseItem from "../../advertise/Slider/AdvertiseItem";


class Grid extends Component {
    placeData = [{
        imageSrc: "https://picsum.photos/252/202/",
        title: "عنوان کوتاهی از پست",
        discountPercent:30,
        haveReserve:false,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 40000,
        salePeice:15000,
        location:"پونک",
        vip:true,
    },{
        imageSrc: "https://picsum.photos/252/200/",
        title: "عنوان کوتاهی از پست",
        discountPercent:50,
        haveReserve:true,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 30000,
        salePeice:12000,
        location:"بهشتی",
        vip:false,
    },{
        imageSrc: "https://picsum.photos/250/202/",
        title: "عنوان کوتاهی از پست",
        discountPercent:15,
        haveReserve:true,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 60000,
        salePeice:52000,
        location:"شریعتی",
        vip:true,
    },{
        imageSrc: "https://picsum.photos/251/200/",
        title: "عنوان کوتاهی از پست",
        discountPercent:23,
        haveReserve:true,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 20000,
        salePeice:12000,
        location:"امام حسین",
        vip:false,
    },{
        imageSrc: "https://picsum.photos/251/201/",
        title: "عنوان کوتاهی از پست",
        discountPercent:11,
        haveReserve:false,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 63000,
        salePeice:48000,
        location:"نواب",
        vip:false,
    },{
        imageSrc: "https://picsum.photos/250/201/",
        title: "عنوان کوتاهی از پست",
        discountPercent:24,
        haveReserve:true,
        description:"تا 60% تخفیف رستوران قلهک دره برای منوی باز یا سرویس چای و قلیان",
        price: 60000,
        salePeice:55000,
        location:"جمهوری",
        vip:true,
    },]


    private getBoxes() {

        const items =[];
        for (const item of this.placeData){
            items.push(

                <div className="box-p">
                    <div className="image-p">
                        {item.vip&&
                            <div className="inm transparent" ></div>
                        }
                        <img src={item.imageSrc}/>
                        <div className="image-hover"><span className="title-h">{item.title}</span>
                            <div className="clear"></div>
                            <span className="takhfif">{item.discountPercent}% تخفیف</span>
                            <a href="#" className="btm"><span>مشاهده جزییات
                                {item.haveReserve&&
                                " و خرید"
                                }

                            </span></a>
                        </div>
                    </div>
                    <div className="text-p"><h2><a href="#">{item.description}</a></h2></div>
                    <div className="price-p"><span>{item.price}</span> تومان - <span className="sale">{item.salePeice} تومان </span>
                    </div>
                    <div className="meta-p">
                        <div className="arrow-up"></div>
                        <div className="addr"><span>{item.location}</span></div>
                        <div className="buy"><span></span></div>
                    </div>
                </div>
            )
        }
        return items;
    }
    render(){
        return (

            <section className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                <div className="posts">
                    <div className="top-title"><span className="ttp">جدیدترین تخفیف ها</span></div>
                    <div className="hidden-xs updated-p"><span>یک ساعت قبل</span></div>
                    <div className="archive-p"><span>مشاهده تمام تخفیف ها</span></div>
                    <div className="arrow-down-ttp"></div>
                    <div className="clear"></div>
                    {this.getBoxes()}


                </div>

                <section className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="pages">
                        <a href="">1</a>
                        <a href="">2</a>
                        <a href="" className="actived">3</a>
                        <a href="">4</a>
                        <a href="">5</a>

                    </div>

                </section>

            </section>


    )
    }

}

export default Grid;
