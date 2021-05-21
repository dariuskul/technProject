const smallerContent = (content) => {
  if (content?.length > 100) {
    return content.substring(0, 50) + "...";
  }
  return content;
};
export const makeRows = (props) => {
  let rows = [];
  if (!props.length) {
    return rows;
  }
  for (let i = 0; i < props.length; i++) {
    if (props[i]?.content) {
      let text = smallerContent(props[i].content);
      props[i].content = text;
    }
    rows.push(props[i]);
  }

  return rows;
};
