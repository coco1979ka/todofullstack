import React, { useState } from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TaskList from "./components/TaskList";

import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";

import TaskForm from "./components/TaskForm";
import useTasks, { Task } from "./api/tasks";
import TaskError from "./components/TaskError";
import TasksMenu from "./components/TasksMenu";

const App = () => {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    fetchError,
    error,
    dismissError,
    deleteDone,
  } = useTasks();
  const [hideDone, setHideDone] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();

  const handleUpdate = async (task: Task): Promise<void> => {
    setCurrentTask({ done: false, id: "", text: "" });
    await updateTask(task);
  };

  const handleEdit = (task: Task): void => setCurrentTask(task);

  const handleReset = (): void =>
    setCurrentTask({ done: false, id: "", text: "" });

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Christians ToDo App</IonTitle>
            <TasksMenu
              hideDone={hideDone}
              handleDeleteDone={deleteDone}
              handleToggleDone={(hidden: boolean): void => setHideDone(hidden)}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid class="ion-no-padding">
            <IonRow class="ion-justify-content-center">
              <IonCol sizeLg="6" sizeMd="8" sizeSm="12">
                <TaskList
                  fetchError={fetchError}
                  hideDone={hideDone}
                  tasks={tasks}
                  currentTask={currentTask}
                  handleDelete={deleteTask}
                  handleUpdate={handleUpdate}
                  handleEdit={handleEdit}
                  handleReset={handleReset}
                />
                {!currentTask?.id && (
                  <TaskForm
                    handleSubmit={createTask}
                    handleReset={handleReset}
                  />
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        <TaskError errorMessage={error} handleDismiss={dismissError} />
      </IonPage>
    </IonApp>
  );
};

export default App;
