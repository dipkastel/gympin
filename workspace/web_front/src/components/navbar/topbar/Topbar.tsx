import React, {Component} from "react";
import jQuery from "jquery";

class Topbar extends Component {
    toggleMenu(e:any) {
        jQuery(this).toggleClass('active');
        jQuery('.city-list').slideToggle();

        e.stopPropagation();
    }

    render(){
        return (
        <section className="col-xs-8 col-sm-4 col-md-2 col-lg-2">
            <div className="loc-top hvr-sweep-to-left" onClick={this.toggleMenu}>
                <div className="arrow-right pull-left"></div>
                <div className="pull-right loc-top-ic"></div>
                <span>تهران</span></div>
            <div className="city-list">
                <ul>
                    <li>
                        <a href="/cities/تهران"
                        >تهران</a>
                    </li>
                    <li>
                        <a href="/cities/اصفهان"
                        >اصفهان</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            بندرعباس</a>
                    </li>
                    <li>
                        <a href="/cities/تبریز"
                        >تبریز</a>
                    </li>
                    <li>
                        <a href="/cities/رشت"
                        >رشت</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/cities/شیراز"
                        >شیراز</a>
                    </li>
                    <li>
                        <a href="/cities/کرج"
                        >کرج</a>
                    </li>
                    <li>
                        <a href="/cities/مشهد"
                        >مشهد</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            همدان</a>
                    </li>
                    <li>
                        <a href="/cities/کیش"
                        >کیش</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="disabled" href="/cities/">
                            یزد</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            سنندج</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            کرمان</a>
                    </li>
                    <li>
                        <a href="/cities/قزوین"
                        >قزوین</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            گرگان</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="disabled" href="/cities/">
                            اهواز</a>
                    </li>
                    <li>
                        <a href="/cities/قم"
                        >قم</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            ساری</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            نوشهر</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            زاهدان</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="disabled" href="/cities/">
                            اراک</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            اردبیل</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            ارومیه</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            ایلام</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            خرم آباد</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="disabled" href="/cities/">
                            زنجان</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            سمنان</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            شهرکرد</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            کرمانشاه</a>
                    </li>
                    <li>
                        <a className="disabled" href="/cities/">
                            بوشهر</a>
                    </li>
                </ul>
            </div>
        </section>
        )
    }

}

export default Topbar;
