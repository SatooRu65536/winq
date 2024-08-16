import logoSvg from '@/assets/imgs/logo.svg';
import styles from './index.module.scss';
import Button from '@/components/shared/Button';
import { commands, Project } from '@/types/bindings';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const projectsRes = await commands.getProjects();
      if (projectsRes.status === 'error') return;

      setProjects(projectsRes.data);
    })();
  }, []);

  const handleCreateProject = () => {
    // TODO: プロジェクト作成処理
    navigate('/settings');
  };

  return (
    <div className={styles.top}>
      <img className={styles.logo} src={logoSvg} />

      <div className={styles.project_setting}>
        <Button onClick={handleCreateProject}>プロジェクトを新規作成</Button>

        <div className={styles.exist_projects}>
          {projects.slice(0, 5).map((p) => (
            <p key={p.name}>{p.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
