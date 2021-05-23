import React from 'react'

const Sort = ({children,by}) => {
    if(!by){
        return children
    }
    console.log("aaaaasda",children)
    return children.sort((a,b) => a.props.children.props[by] > b.props.children.props[by])
}
export default Sort;