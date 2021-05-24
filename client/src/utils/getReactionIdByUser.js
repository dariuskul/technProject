export const reactionIdByUser = (userId, reactions,selectValues) => {
  const postReactions = reactions;
  for (let i = 0; i < postReactions.length; i++) {
    if(postReactions[i].reaction !==selectValues.reaction && postReactions[i].userId === userId && selectValues.postId === postReactions[i].postId){
        return postReactions[i];
    }
  }

};
