export default function clickHandler(item, navigator) {
    console.log(item);
    if (!item.Destination) return;
    switch (item.Destination.Name) {
        case "PLACES": {
            if (!item.Data)
                navigator("/places", {replace: false});
            else
                navigator("/place/" + item.Data, {replace: false});
        }
            break;
        case "SPORTS": {
        }
            break;
        case "OUTERBROWSER": {
            if (item.Data)
                window.open(item.Data, '_blank');
        }
            break;
        case "INNERBROWSER": {
            console.log(item)
            if (item.Data)
                window.open(item.Data, '_self');
        }
            break;
        case "USERLIST": {

        }
            break;
        case "PROFILE": {
            navigator("/profile", {replace: false});
        }
            break;
        case "CONTENTS": {
            if (item.Data)
                window.open(item.Data, '_blank');

        }
            break;
        case "DISCOUNTS": {
            if (!item.Data)
                navigator("/places", {replace: false});
            else
                navigator("/place/" + item.Data, {replace: false});
        }
            break;
        case "SINGLECONTENT": {

        }
            break;
        case "SINGLEDISCOUNT": {

        }
            break;
        case "INVITEFRIENDS": {
            navigator("/profile/invitefriends", {replace: false});

        }
            break;
        case "SURVEYLIST": {

        }
            break;
        case "LOGOUT": {

        }
            break;
        case "SUBSCRIBES": {
            navigator("/subscribes", {replace: false});
        }
            break;
        default: {
        }
            break;
    }

}
