export const reactionCount = (post, reaction) => {
  let count = 0;

  for (let i = 0; i < post?.reacts.length; i++) {
    const react = post?.reacts[i];
    if (react.reaction === reaction) {
      count++;
    }
  }

  return count;
};
