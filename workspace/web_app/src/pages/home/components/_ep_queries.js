import React from 'react';
import {gym_query} from "../../../network/api/gym.api";
import {ticketSubscribe_query} from "../../../network/api/ticketSubscribe.api";
import _ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM from "./_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM";
import _ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_SUBSCRIBE from "./_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_SUBSCRIBE";
import _ep_CAROUSEL_BUTTON_LIST_ITEM from "./_ep_CAROUSEL_BUTTON_LIST_ITEM";


export function getQueryResults(carousel, error) {


    function quertFixer(queryString) {
        try{
            const regex = /\[date-(hour|day|month)(Before|After)-(\d+)]/;
            if(queryString.match(regex))
                queryString = queryString.replace(
                    regex,
                    (_, unit, direction, amount) => {
                        const date = new Date();
                        const value = Number(amount);
                        const sign = direction === 'Before' ? -1 : 1;

                        switch (unit) {
                            case 'hour':
                                date.setHours(date.getHours() + sign * value);
                                break;

                            case 'day':
                                console.log("reere","day")
                                date.setDate(date.getDate() + sign * value);
                                break;

                            case 'month':
                                date.setMonth(date.getMonth() + sign * value);
                                break;
                        }

                        return '"'+date.toISOString().split('T')[0]+'"';
                    }
                )
            return  {...JSON.parse(queryString)};
        }catch (ex){
        }
    }

    return new Promise((resolve, reject) => {
        if (carousel?.Items?.[0]?.Type?.startsWith("QUERY"))
            switch (carousel?.Items?.[0]?.Type?.split("_")[1]) {
                case "GYM":
                    gym_query(quertFixer(carousel.Items?.[0]?.Data)).then(result => {
                        resolve(result.data.Data.content);
                    }).catch(e => {
                        reject(e)
                    });
                    break;
                case "SUBSCRIBE":
                    ticketSubscribe_query(quertFixer(carousel.Items?.[0]?.Data)).then(result => {
                        resolve(result.data.Data.content);
                    }).catch(e => {
                        reject(e)
                    });
                    break;
                case "COUNSELIG":
                    alert("get couns");
                    break;
                case "APPOINTMENT":
                    alert("get appoi");
                    break;
                default:
                    alert("nop");
                    break;
            }
        else
            return resolve(carousel?.Items);

    })

}


export function getListByViewType(type,item) {
    switch (type) {
        case "SIMPLE_GYM":
            return <_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM key={"Gym"+item.Id} item={item}/>
        case "SIMPLE_SUBSCRIBE":
            return <_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_SUBSCRIBE key={"SUBSCRIBE"+item.Id} item={item}/>
        case "SIMPLE_SPORT_CAT":
            return <_ep_CAROUSEL_BUTTON_LIST_ITEM key={"SPORT_CAT"+item.Id} item={item}  />;
    }
}
