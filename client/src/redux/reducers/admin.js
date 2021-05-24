export default function adminReducer(users = [], action) {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload.filter((user) => (user.isSuspended ? "" : user));
    case "SUSPEND_USER":
      return users.filter((user) => user.id !== action.payload);
    case "REMOVE_USER":
      return users.filter((user) => user.id !== action.payload);
    case "FETCH_SUSPENDED_USERS":
      return action.payload;
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return users;
  }
}
