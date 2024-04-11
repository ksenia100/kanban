export interface Issue {
    id: number;
    title: string;
    description: string;
    state: 'open' | 'closed';
    number: number;
    user: { login: string };
    comments: number;
    created_at: string;
}

export interface RepoInfo {
    name: string;
    id: number;
    stargazers_count: number;
    html_url: string;
    message: string;
    owner: { login: string };
}

export interface InitialState {
    issues: Issue[];
    repo: RepoInfo[];
}

export interface Board {
    name: string;
    items: Issue[];
}