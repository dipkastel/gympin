import React, {Component} from "react";

 class GetmailDesc extends Component{
     render() {
         return (
             <div className="email-content">
                 <div className="container">
                     <section className="visible-xs">
                         <span className="text-mail">برای اطلاع از تخفیف‌های جدید ایمیل خود را وارد کنید</span>
                     </section>
                     <div className="row">

                         <section className="col-xs-12 col-sm-10 col-md-10 col-lg-10 pull-left">
                             <input type="text" name="email" className="c-inputs" placeholder="Enter Your Email"/>
                         </section>
                         <section className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                             <input type="submit" name="submit-mail" className="c-inputs-s" value="ثبت ایمیل"/>
                         </section>
                     </div>
                 </div>
             </div>
         )
     }
}
export default GetmailDesc;
