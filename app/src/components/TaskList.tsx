import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import React from "react";
import { Task } from "../api/tasks";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

type TaskListProps = {
  hideDone: boolean;
  tasks: Record<string, Task> | undefined ;
  fetchError: string;
  currentTask: Task | undefined;
  handleDelete: (task: Task) => void;
  handleUpdate: (task: Task) => void;
  handleEdit: (task: Task) => void;
  handleReset: () => void;
};

const TaskList: React.FC<TaskListProps> = ({
  fetchError,
  hideDone,
  tasks,
  currentTask,
  handleDelete,
  handleUpdate,
  handleEdit,
  handleReset,
}) => {
  if (fetchError)
    return (
      <IonList>
        <IonItem>
          <IonLabel color="danger">Could not fetch tasks...</IonLabel>
        </IonItem>
      </IonList>
    );

  if (!tasks)
    return (
      <IonList>
        <IonItem>
          <IonLabel>Loading tasks...</IonLabel>
          <IonSpinner slot="end"></IonSpinner>
        </IonItem>
      </IonList>
    );

  return (
    <IonList data-cy="tasks">
      {tasks &&
        Object.entries(tasks)
          .filter(([_, task]) => (hideDone ? task.done === false : true))
          .map(([id, task]) =>
            currentTask && task.id === currentTask.id ? (
              <TaskForm
                key={id}
                task={task}
                handleReset={handleReset}
                handleSubmit={(text) => {
                  handleUpdate({ ...task, text });
                }}
              />
            ) : (
              <TaskItem
                key={id}
                task={task}
                deleteHandler={() => handleDelete(task)}
                handleDone={(done) => handleUpdate({ ...task, done })}
                handleEdit={() => handleEdit(task)}
              />
            )
          )}
    </IonList>
  );
};

export default TaskList;
