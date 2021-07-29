import React, {Component} from "react";
import jQuery from "jquery";

 class Getmail extends Component{

     toggleMenu(e:any) {
         jQuery(this).toggleClass('active');
         jQuery('.email-content').slideToggle();
         e.stopPropagation();
     }

     render() {
         return (
             <section className="hidden-xs col-sm-2 col-md-8 col-lg-8">
                 <span className="text-mail">برای اطلاع از تخفیف‌های جدید ایمیل خود را وارد کنید</span>
                 <div className="hvr-buzz-out ic-mail" onClick={this.toggleMenu}></div>
             </section>
         )
     }
}
export default Getmail;
