import React, {Component} from "react";
import jQuery from "jquery";

class UserMenu extends Component{

    ToggleCard(e:any){

        jQuery(this).toggleClass('active');
        jQuery('.sabad-content').slideToggle();

        e.stopPropagation();
    }
    OpenLogin( e:any){
            var targeted_popup_class = jQuery("#popup-1-o").attr('data-popup-open');
            jQuery('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
            e.stopPropagation();
    }
    CloseLogin(e:any){
                var targeted_popup_class = jQuery("#popup-1-c").attr('data-popup-close');
        console.log(targeted_popup_class);
                jQuery('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                e.preventDefault();
    }

    render() {
        return (
            <section className="col-xs-12 col-sm-5 col-md-4 col-lg-3">


                <section className="col-sm-6 col-md-6 col-lg-6">
                    <div className="btt-top hvr-radial-out popup-1" id="popup-1-o"  data-popup-open="popup-1" onClick={this.OpenLogin}>
                        <div className="circle-btt"><i className="user-ic"></i></div>
                        <span>ورود / ثبت نام</span>
                    </div>
                </section>


                <section className="col-sm-6 col-md-6 col-lg-6">
                    <div className="btt-top hvr-radial-out" onClick={this.ToggleCard} >
                        <div className="circle-btt"><i className="sabad-ic"></i></div>
                        <span>سبد خرید</span>
                        <span className="badge">5</span>

                    </div>
                    <div className="sabad-content">
                        <ul>
                            <li><a href="">
                                <div className="cover"><img src="/src/assets/images/rabee-ali.jpg"/></div>
                                تست متن تست عنوان
                                تست متن تست عنوان
                                تست متن تست عنوان
                            </a>
                            </li>
                            <li><a href="">
                                <div className="cover"><img src="../rabee-ali.jpg"/></div>
                                تست متن تست عنوان
                            </a>
                            </li>

                        </ul>
                        <a className="tasvie" href="">صورت حساب / پرداخت</a>
                    </div>
                </section>

                <div className="popup"  data-popup="popup-1">
                    <div className="popup-inner">
                        <h2>Wow! This is Awesome! (Popup #1)</h2>
                        <p>Donec in volutpat nisi. In quam lectus, aliquet rhoncus cursus a, congue et arcu. Vestibulum
                            tincidunt neque id nisi pulvinar aliquam. Nulla luctus luctus ipsum at ultricies. Nullam nec
                            velit dui. Nullam sem eros, pulvinar sed pellentesque ac, feugiat et turpis. Donec gravida
                            ipsum cursus massa malesuada tincidunt. Nullam finibus nunc mauris, quis semper neque
                            ultrices in. Ut ac risus eget eros imperdiet posuere nec eu lectus.</p>
                        <p><a data-popup-close="popup-1" href="#">Close</a></p>
                        <a className="popup-close " data-popup-close="popup-1" id="popup-1-c"  href="#" onClick={this.CloseLogin}>x</a>
                    </div>
                </div>
            </section>

        )
    }
}
export default UserMenu;
