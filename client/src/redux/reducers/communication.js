export default function communicationReducer(communication = [], action) {
  switch (action.type) {
    case "GET_PROFILE":
      return action.payload;
    case "FOLLOW_USER":
      return {
        ...communication,
        followers: action.payload.data
          ? [...communication.followers, action.payload.data]
          : communication.followers.filter(
              (data) => data.username !== action.payload.id
            ),
      };
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return communication;
  }
}
