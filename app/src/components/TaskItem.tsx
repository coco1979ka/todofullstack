import {
  IonButtons,
  IonButton,
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { trash, createOutline } from "ionicons/icons";
import { Task } from "../api/tasks";

type TaskProps = {
  task: Task;
  deleteHandler: () => void;
  handleDone: (done: boolean) => void;
  handleEdit: () => void;
};

const TaskItem = ({deleteHandler, handleDone, handleEdit, task }: TaskProps) => {
  return (
    <IonItemSliding>
      <IonItem data-cy={"task"}>
        <IonLabel
          color={task.done ? "medium" : "dark"}
          style={task.done ? { textDecoration: "line-through" } : {}}
          data-cy={"label"}
        >
          {task.text}
        </IonLabel>
        <IonCheckbox
          slot="start"
          checked={task.done}
          onIonChange={(e) => handleDone(e.detail.checked)}
          data-cy={"toggle"}
        ></IonCheckbox>
        <IonButtons slot="end" class="ion-hide-md-down">
          {!task.done && (
            <IonButton onClick={handleEdit} data-cy="edit-button">
              <IonIcon icon={createOutline} color="dark"></IonIcon>
            </IonButton>
          )}
          <IonButton onClick={deleteHandler} data-cy={"delete-button"}>
            <IonIcon icon={trash} color="danger"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonItem>
      <IonItemOptions side="end" onIonSwipe={deleteHandler}>
        {!task.done && (
          <IonItemOption onClick={handleEdit}>
            <IonIcon icon={createOutline} slot="icon-only"></IonIcon>
          </IonItemOption>
        )}
        <IonItemOption color="danger" onClick={deleteHandler} expandable={true}>
          <IonIcon icon={trash} slot="icon-only"></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;
