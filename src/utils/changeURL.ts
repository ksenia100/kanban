export const changeUrlIssues = (input: string) => `https://api.github.com/repos/${input.replace('https://github.com/', '')}/issues?state=all&per_page=15`;
export const changeUrlAbout = (input: string) => `https://api.github.com/repos/${input.replace('https://github.com/', '')}`;