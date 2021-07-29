import React, {Component} from 'react'
import Carousel from 'react-elastic-carousel'
import AdvertiseItem from "./AdvertiseItem";

const breakPoints = [
    { width:1,itemToShow: 1},
    { width:550,itemToShow: 1},
    { width:768,itemToShow: 1},
    { width:1200,itemToShow: 1},
]

class Slider extends Component {

    listOfData =[
         {
             id:0,
         title:"عنوان مطلب ویژه حداکثر در 55 کارکتر وارد شود تست عنوان تست 1",
         location:"سعادت آباد",
         time:7,
         sellCount:48,
         sellPercent:30,
         desc:"تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n" +
             "تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n",
         price:150000,
         sellPrice:60000,
         imageSrc:"https://picsum.photos/200/300/"
     },
         {
             id:1,
         title:"عنوان مطلب ویژه حداکثر در 55 کارکتر وارد شود تست عنوان تست 1",
         location:"تهرانپارس",
         time:8,
         sellCount:150,
         sellPercent:20,
         desc:"تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n" +
             "تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n",
         price:160000,
         sellPrice:50000,
         imageSrc:"https://picsum.photos/id/237/200/300"
     },
         {
             id:2,
         title:"عنوان مطلب ویژه حداکثر در 55 کارکتر وارد شود تست عنوان تست 1",
         location:"گلفروشان",
         time:9,
         sellCount:11,
         sellPercent:10,
         desc:"تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n" +
             "تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن تست متن\n",
         price:170000,
         sellPrice:40000,
         imageSrc:"https://picsum.photos/200/300"
     }
     ];
     getSlider(){
         const items =[];
         for (const item of this.listOfData){
             items.push(

                 <AdvertiseItem>
                     {item}
                 </AdvertiseItem>
             )
         }
         return items;
     }

    render(){

        return (
            <div id="slider">

                <Carousel breakPoints={breakPoints} isRTL={true}  showArrows={false}>
                    {this.getSlider()}
                </Carousel>
            </div>

        )
    }


}

export default Slider;





