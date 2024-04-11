import React from 'react';
import './App.css';
import Input from './components/Input/Input';
import TodoList from './components/TodoList/TodoList';
import RepoInfoComponent from './components/RepoInfo/RepoInfo';

const App: React.FC = () => {
    return (
        <div>
            <Input />
            <RepoInfoComponent />
            <TodoList />
            <div />
        </div>
    );
}

export default App;
