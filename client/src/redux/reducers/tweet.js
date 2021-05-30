export default function communicationReducer(tweets = [], action) {
  switch (action.type) {
    case "GET_TWEETS":
      console.log(action.payload);
      return [action.payload];
    case "GET_MORE":
      return [...tweets, action.payload];
    case "ERROR":
      return [...tweets, action.payload];
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return tweets;
  }
}
