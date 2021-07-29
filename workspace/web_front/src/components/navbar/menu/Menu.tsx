import React, {Component} from "react";
import jQuery from "jquery";

class Menu extends Component {
    toggleMenu(e:any) {
            jQuery(this).toggleClass('active');
            jQuery('.menu ul').toggleClass('active');
            e.preventDefault();
    }

    render() {
        return (
            <section className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
                <nav className="menu">
                    <ul className="hvr-bounce-to-bottom active">
                        <li className="mm sub"><a href="">تغذیه</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">پوشاک</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">لوازم منزل</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">دیجیتال</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">تفریح و سرگرمی</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">گردشگری</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                        <li className="mm sub"><a href="">تزیینی</a>
                            <ul>

                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                                <li>تست</li>
                            </ul>
                        </li>
                    </ul>

                    <a className="toggle-nav" onClick={this.toggleMenu} href="#">&#9776;</a>


                </nav>


            </section>
        )
    }
}

export default Menu;
