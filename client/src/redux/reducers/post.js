export default function postReducer(posts = [], action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "NEW_POST":
      return [...posts, action.payload];
    case "UPDATE":
      return posts?.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case "REMOVE_POST":
      return posts?.filter((post) => post.id !== action.payload);
    case "ADD_REACTION":
      return posts.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              reacts: [...post.reacts, action.payload],
            }
          : post
      );
    case "REMOVE_REACTION":
      console.log("AAAA", action.payload);
      return posts.map((post) =>
        post.id === action.payload.postId
          ? {
              ...post,
              reacts: [
                post.reacts.filter((react) => react.id !== action.payload.id),
              ],
            }
          : post
      );
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return posts;
  }
}
