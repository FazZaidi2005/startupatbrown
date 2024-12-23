// Dialog.js
export const Dialog = ({ children }) => {
    return <div className="dialog">{children}</div>;
};

export const DialogContent = ({ children }) => {
    return <div className="dialog-content">{children}</div>;
};

export const DialogHeader = ({ children }) => {
    return <div className="dialog-header">{children}</div>;
};

export const DialogTitle = ({ children }) => {
    return <h2 className="dialog-title">{children}</h2>;
};

export const DialogTrigger = ({ children, asChild }) => {
    return asChild ? children : <button className="dialog-trigger">{children}</button>;
};
