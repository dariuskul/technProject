export default function suspendedCommentsReducer(suspendedPosts = [], action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "FETCH_ALL_SUSPENDED_COMMENTS":
      return action.payload;
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return suspendedPosts;
  }
}
