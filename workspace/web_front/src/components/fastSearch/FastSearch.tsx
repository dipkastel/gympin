import React, {Component} from 'react'
import  "./FastSearch.css";

class FastSearch extends Component {

    render(){
        return (
         <div className="bgs">
                    <div className="container">
                        <div className="row">


                            <section className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                                <div className="t-search-t"><span>جستجوی سریع در محصولات </span>
                                    <div className="arrow-down"></div>
                                </div>
                            </section>
                            <div className="clear"></div>
                            <section className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                                <div className="loc-top-s hvr-radial-out">
                                    <div className="arrow-down-s pull-left"></div>
                                    <div className="pull-right loc-top-ic"></div>
                                    <span>تهران</span>

                                    <select className="ss">
                                        <option>تهران</option>
                                        <option>مشهد</option>
                                        <option>اصفهان</option>
                                        <option>یزد</option>

                                    </select>
                                </div>
                            </section>
                            <section className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
                                <input type="text" name="search" className="input-search"
                                       placeholder="عنوان کلمه مورد جستجو را وارد کنید"/>
                            </section>
                            <section className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                                <input type="submit" name="search-submit" className="input-search-s" value="جستجو"/>
                            </section>

                        </div>
                    </div>
                </div>
        )
    }

}

export default FastSearch;
