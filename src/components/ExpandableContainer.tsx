import React, {useState, FunctionComponent} from 'react';

interface ExpandableContainerProps {
    extendedChildren: any
    className?: string
    childrenHiddenOnExpand?: any
    defaultOpen?: boolean
}

const ExpandableContainer:FunctionComponent<ExpandableContainerProps> = ({ extendedChildren, childrenHiddenOnExpand, children, defaultOpen=false, className=''}) => {

    const [isOpen, setOpen] = useState(defaultOpen);

    return (
        <div 
            onClick={() => setOpen(!isOpen)}
            >
            <div>
                {children}    
            </div>
            <div className={className}>
                {(childrenHiddenOnExpand && !isOpen) && childrenHiddenOnExpand}
                {(isOpen && extendedChildren) && extendedChildren}
            </div>
        </div>
    )
}

export default ExpandableContainer;