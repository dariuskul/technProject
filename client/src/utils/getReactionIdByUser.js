export const ADD_REMOVE = 'REMOVE_REACTION_ADD_REACTION';
export const ADD_ONLY = 'ADD';
export const REMOVE_ONLY = 'REMOVE';
export const reactionIdByUser = (userId, reactions,selectValues) => {
  const postReactions = reactions;
  for (let i = 0; i < postReactions.length; i++) {
    if(postReactions[i].reaction !==selectValues.reaction && postReactions[i].userId === userId && selectValues.postId === postReactions[i].postId){
        return [postReactions[i],ADD_REMOVE];
    }

    if(postReactions[i].reaction ===selectValues.reaction && postReactions[i].userId === userId && selectValues.postId === postReactions[i].postId){
      return [postReactions[i],REMOVE_ONLY];
  }
  }

  return ADD_ONLY;

};
