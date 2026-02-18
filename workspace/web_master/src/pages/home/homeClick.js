export default function clickHandler(item, navigator) {
  if (!item.Destination) return;
  switch (item.Destination.Name) {
    case "PLACES":
      {
        if (!item.Data) navigator("/places", { replace: false });
        else navigator("/place/" + item.Data, { replace: false });
      }
      break;
    case "SPORTS":
      {
        console.log("SPORTS");
      }
      break;
    case "OUTERBROWSER":
      {
        if (item.Data) window.open(item.Data, "_blank");
      }
      break;
    case "INNERBROWSER":
      {
        if (item.Data) window.open(item.Data, "_self");
      }
      break;
    case "USERLIST":
      {
        console.log("USERLIST");
      }
      break;
    case "PROFILE":
      {
        navigator("/profile", { replace: false });
      }
      break;
    case "CONTENTS":
      {
        if (item.Data) window.open(item.Data, "_blank");
      }
      break;
    case "DISCOUNTS":
      {
        if (!item.Data) navigator("/places", { replace: false });
        else navigator("/place/" + item.Data, { replace: false });
      }
      break;
    case "SINGLECONTENT":
      {
        console.log("SINGLECONTENT");
      }
      break;
    case "SINGLEDISCOUNT":
      {
        console.log("SINGLEDISCOUNT");
      }
      break;
    case "INVITEFRIENDS":
      {
        navigator("/profile/invitefriends", { replace: false });
      }
      break;
    case "SURVEYLIST":
      {
        console.log("SURVEYLIST");
      }
      break;
    case "LOGOUT":
      {
        console.log("LOGOUT");
      }
      break;
    case "SUBSCRIBE":
      {
        navigator("/subscribes", { replace: false });
      }
      break;
    default:
      {
        console.log("default - " + item.Destination);
      }
      break;
  }
}
