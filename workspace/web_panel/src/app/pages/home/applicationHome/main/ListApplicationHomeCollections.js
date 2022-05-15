import React, {Component} from "react";
import * as collection from "../../../../api/collection.api";
import {Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../../_metronic";
import ModalAddApplicationHomeCollectionList from "./ModalAddApplicationHomeCollectionList";


class ListApplicationHomeCollections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCollectionsArray: [],
            selectedItemToDelete: null
        };
    }

    render() {
        return (
            <>
                <div className="kt-portlet kt-portlet--height-fluid">
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {this.state.allCollectionsArray.map(this.renderCollectionsRow)}
                            {this.state.allCollectionsArray.map(this.renderCollectionsRow)}
                            {this.state.allCollectionsArray.map(this.renderCollectionsRow)}
                            {this.state.allCollectionsArray.map(this.renderCollectionsRow)}
                            {this.state.allCollectionsArray.map(this.renderCollectionsRow)}
                        </div>
                    </div>
                </div>

                {this.state.selectedItemToDelete&&
                <ModalAddApplicationHomeCollectionList/>}
            </>
        );
    }

    componentDidMount() {

        this.getAllCollections()
    }

    getAllCollections() {

        collection._getAll().then(data => {
            this.setState(() => ({
                allCollectionsArray: data.data.Data
            }));
        })

    }

    renderCollectionsRow=(data, index)=> {
        return (
                <div className="kt-widget4__item "  key={index}>
                    <div className="kt-widget4__pic kt-widget4__pic--pic ">
                        <img alt="" src={toAbsoluteUrl("/media/users/100_11.jpg")}/>
                    </div>
                    <div className="kt-widget4__info ">
                        {/*<a className="kt-widget4__username"*/}
                        {/*    href="https://keenthemes.com.my/metronic">*/}
                        {/*    {data.CollectionName}*/}
                        {/*</a>*/}
                        <a className="kt-widget4__title"
                           href="https://keenthemes.com.my/metronic">
                            {data.CollectionName}
                        </a>
                        {/*<p className="kt-widget4__text ">*/}
                        {/*    {data.CollectionName}*/}
                        {/*</p>*/}
                    </div>

                    <span className="pr-1">
                    <Button variant="danger" onClick={(e) => this.openModalDelete(e, data)}> حذف </Button>
                    </span>
                </div>

        )
    }

    openModalDelete=(e, data)=>{
        e.preventDefault()
        this.setState(() => ({
            selectedItemToDelete: data
        }));
    }
    closeModalDelete=(e, data)=>{
        e.preventDefault()
        this.setState(() => ({
            selectedItemToDelete: null
        }));
    }
}


export default ListApplicationHomeCollections;
