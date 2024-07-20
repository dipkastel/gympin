import store from "./redux/store";
import {connect} from "react-redux";
import {sagaActions} from "./redux/actions/SagaActions";

export default function getAccessOf(section){
     const access = store.getState().access.access
    if(!access){
        const user = store.getState().auth.user
        const place = store.getState().place.place;
        if(user&&place){
            //access gets after place set
            //this is for some error there
            store.dispatch(sagaActions.RequestAccess(user.Id,place.Id));
            return true;
        }else if(!user){
            //logout
            return true;
        }else if(!place){
            //go to settings for select place
            return true;
        }
    }

     return access.find(a=>a.Section==section)?.Access;
}
