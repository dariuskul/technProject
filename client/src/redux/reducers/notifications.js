const notifications = [];
export default function notificationsReducer(state = notifications, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "CREATED":
      return {
        notifications: action.payload,
      };
    case "CLEAR":
      return [];
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
