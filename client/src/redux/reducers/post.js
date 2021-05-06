export default function postReducer(posts = [], action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "FETCH_ALL":
      return {
        initialState: action.payload,
      };
    case "NEW_POST":
      return [...posts, action.payload];
    case "UPDATE":
      return posts?.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return posts;
  }
}
