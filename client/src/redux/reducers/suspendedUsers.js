export default function suspendedUsersReducer(suspendedUsers = [], action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      case "FETCH_SUSPENDED_USERS":
        return action.payload;
      case "UNSUSPEND_USER":
          return suspendedUsers.filter((user)=> user.id!== action.payload)
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return suspendedUsers;
    }
  }
  