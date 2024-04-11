import { useState } from 'react';
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    const taskId = Math.random();
    const newTask = {
      text: text,
      projectId: prevState.selectedProjectId,
      id: taskId,
    };

    setProjectsState(prevState => {
      return {
        ...prevState,
        task: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask() {

  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAppProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddproject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId
    };

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <
    SelectedProject project={selectedProject} 
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask} 
    task={projectsState.tasks}
    />;

  if (projectsState.selectedProjectId === null) {
    content = (<NewProject onAdd={handleAddProject} onCancel={handleCancelAddproject} />);
  } else if (projectsState.selectedProjectId === undefined) {
    content = (<NoProjectSelected onStartAddproject={handleStartAppProject} />);
  }


  return (
    <main className="h-screen my-8 flex gap -8">
      <ProjectsSidebar
        onStartAddProject={handleStartAppProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
