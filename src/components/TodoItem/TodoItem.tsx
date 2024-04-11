import { Issue, Board } from "../../types/types.js";
import { timeAgo } from "../../utils/timeAgo";

export interface TodoItemProps {
    id: number;
    title: string;
    number: number;
    login: string;
    comments: number;
    created: string;
    board: Board;  
    item: Issue;  
    onDragOver: React.DragEventHandler<HTMLDivElement>;
    onDragLeave: React.DragEventHandler<HTMLDivElement>;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, board: Board, item: Issue) => void;
    onDragEnd: React.DragEventHandler<HTMLDivElement>;
    onDrop: (e: React.DragEvent<HTMLDivElement>, board: Board, item: Issue) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    id,
    title,
    number,
    login,
    comments,
    created,
    board,
    item,
    onDragOver,
    onDragLeave,
    onDragStart,
    onDragEnd,
    onDrop,
}) => {
    const date = timeAgo(created);
    
    return (
        <div
            className="todoitem"
            draggable
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragStart={(e) => onDragStart(e, board, item)}
            onDragEnd={onDragEnd}
            onDrop={(e) => onDrop(e, board, item)}
        >
            <div className="todoitem__el">{title}</div>
            <div className="todoitem__flex">
                <p className="todoitem__el">#{number}</p>
                <p className="todoitem__el">{date}</p>
            </div>
            <div className="todoitem__flex">
                <p className="todoitem__el">{login}</p>
                <span className="todoitem__el">|</span>
                <p className="todoitem__el">Comments: {comments}</p>
            </div>
        </div>
    );
}

export default TodoItem;
