import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const RepoInfoComponent: React.FC = () => {
    const repoInfoArray = useSelector((state: RootState) => state.issues.repo);

    const repoInfo = repoInfoArray[0];

    return (
        <>
            {repoInfo && repoInfo.id > 0 && (
                <div className="repo">
                    <a
                        href={repoInfo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo__link">
                        {repoInfo.name}
                    </a>

                    <span>
                        ⭐ {Math.round(repoInfo.stargazers_count / 1000)} K stars
                    </span>
                </div>
            )}
        </>
    );
}

export default RepoInfoComponent;
