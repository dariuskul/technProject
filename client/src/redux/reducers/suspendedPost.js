export default function suspendedPostReducer(suspendedPosts = [], action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "FETCH_ALL_SUSPENDED_POSTS":
      return action.payload;
    case "UNSUSPEND_POST":
      return suspendedPosts.filter((post) => post.id !== action.payload);
    case "REMOVE_POST":
      return suspendedPosts.filter((post) => post.id !== action.payload);
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return suspendedPosts;
  }
}
