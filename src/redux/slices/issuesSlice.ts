import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, RepoInfo, InitialState } from '../../types/types';

const initialState: InitialState = {
    issues: [],
    repo: [],
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        loadIssues(state, action: PayloadAction<Issue[]>) {
            state.issues = [...action.payload];
        },
        loadRepoInfo(state, action: PayloadAction<RepoInfo[]>) {
            state.repo = action.payload;
        },
        dragIssue(state, action: PayloadAction<{ currentItem: Issue, board: { name: string } }>) {
            state.issues = state.issues.map((issue) => {
                if (issue.id === action.payload.currentItem.id) {
                    if (action.payload.board.name === 'In Progress') {
                        issue.state = 'open';
                    }
                    if (action.payload.board.name === 'Done') {
                        issue.state = 'closed';
                    }
                    return issue;
                }
                return issue;
            });
        },
    },
});

export default issuesSlice.reducer;
