import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import { issuesSlice } from '../../redux/slices/issuesSlice';
import { RootState } from '../../redux/store/store';
import { Issue, RepoInfo, Board } from '../../types/types';

function TodoList() {
    const [boards, setBoards] = useState<Board[]>([
        { name: 'All Todo', items: [] },
        { name: 'In Progress', items: [] },
        { name: 'Done', items: [] },
    ]);

    const allIssues = useSelector((state: RootState) => state.issues.issues) as Issue[];
    const repoInfoArray = useSelector((state: RootState) => state.issues.repo) as RepoInfo[];
    const repoInfo = repoInfoArray[0];

    const { dragIssue } = issuesSlice.actions;
    const dispatch = useDispatch();

    const inProgressIssues = allIssues.filter((issue) => issue.state === 'open') as Issue[];
    const doneIssues = allIssues.filter((issue) => issue.state === 'closed') as Issue[];

    useEffect(() => {
        setBoards([
            { name: 'All Todo', items: [...allIssues] },
            { name: 'In Progress', items: [...inProgressIssues] },
            { name: 'Done', items: [...doneIssues] },
        ]);
    }, [repoInfo, allIssues]);

    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    const [currentItem, setCurrentItem] = useState<Issue | null>(null);

    function dragOverHandlerEvent(e: FormEvent) {
        e.preventDefault();
    }

    function dragStartHandler(e: FormEvent, board: Board, item: Issue) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e: FormEvent) {}

    function dropHandler(e: FormEvent, board: Board, item: Issue) {
        e.preventDefault();
        e.stopPropagation();

        if (currentBoard && currentItem) {
            const currentIndex = currentBoard.items.indexOf(currentItem);
            currentBoard.items.splice(currentIndex, 1);
            const dropIndex = board.items.indexOf(item);
            board.items.splice(dropIndex + 1, 0, currentItem);

            setBoards((prevBoards) => [
                ...prevBoards.map((b) => (b.name === board.name ? board : b)),
            ]);

            dispatch(dragIssue({ currentItem, board }));
        }
    }

    function dropCardHandler(e: FormEvent, board: Board) {
        if (currentItem) {
            board.items.push(currentItem);
            if (currentBoard) {
                const currentIndex = currentBoard.items.indexOf(currentItem);
                currentBoard.items.splice(currentIndex, 1);
            }

            setBoards((prevBoards) => [
                ...prevBoards.map((b) => (b.name === board.name ? board : b)),
            ]);

            dispatch(dragIssue({ currentItem, board }));
        }
    }

    sessionStorage.setItem(repoInfo?.html_url || '', JSON.stringify(allIssues));

    return (
        <div className="todolist">
            {boards.map((board) => (
                <div key={board.name} className="todolist__column">
                    <div className="todolist__title">{board.name}</div>
                    <div className="todolist__todos">
                        {board.items.length ? (
                            board.items.map((item: Issue) => (
                                <TodoItem
                                    id={item.id}
                                    title={item.title}
                                    number={item.number}
                                    login={item.user.login}
                                    comments={item.comments}
                                    created={item.created_at}
                                    board={board}
                                    item={item}
                                    onDragOver={(e) => dragOverHandlerEvent(e)}
                                    onDragLeave={(e) => {}}
                                    onDragStart={(e) => dragStartHandler(e, board, item)}
                                    onDragEnd={(e) => {}}
                                    onDrop={(e) => dropHandler(e, board, item)}
                                    key={item.id}
                                />
                            ))
                        ) : (
                            <span>No todo</span>
                        )}
                    </div>
                </div>
            ))}

        </div>
    );
    
}

export default TodoList;
