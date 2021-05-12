export const reactionIdByUser = (userId, reactions) => {
  let id = -1;

  for (let i = 0; i < reactions.length; i++) {
    if (reactions[i].userId === userId) {
      id = reactions[i].id;
    }
  }

  return id;
};
