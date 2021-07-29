import React, {Component} from 'react'
import jQuery from 'jquery';


class Filter extends Component {
    private sliderConfig={
        from: 100000,
        to: 1000000,
        step: 1,
        dimension: "",
        skin: "plastic"};

    render(){
        return (

            <section className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                <div className="sidebar">
                    <div className="side-block">
                        <span className="title">فیلتر محصولات</span>
                        <div className="content">
                            <label className="form">استان</label>
                            <select className="form">
                                <option>test</option>
                            </select>

                            <label className="form">شهر</label>
                            <select className="form">
                                <option>test</option>
                            </select>

                            <label className="form">ناحیه</label>
                            <select className="form">
                                <option>test</option>
                            </select>

                            <label className="form">گروه</label>
                            <select className="form">
                                <option>test</option>
                            </select>

                            <label className="form">زیرگروه</label>
                            <select className="form">
                                <option>test</option>
                            </select>

                            <label className="form">محدوده قیمت </label>

                            <div className="layout-slider" >
							<span className="jsc">
								<input id="price" type="slider" name="price" value="100000;1000000"/>
							</span>
                            </div>
                            <script type="text/javascript">
                                jQuery("#price").slider(this.sliderConfig);
                            </script>
                            <input type="submit" className="form" value="اعمال فیلتر" name="submit"/>
                        </div>
                    </div>


                    <div className="side-block">
                        <span className="title">جیم پین در شبکه های اجتماعی</span>
                        <div className="content">
                            <div className="clear"></div>
                            <a href="" className="soc fb"><span>chichik On Facebook</span></a>
                            <a href="" className="soc google"><span>chichik On Google</span></a>
                            <a href="" className="soc tw"><span>chichik On Twitter</span></a>
                            <a href="" className="soc insta"><span>chichik On Instagram</span></a>
                        </div>
                    </div>


                </div>
            </section>


        )
    }

}

export default Filter;
