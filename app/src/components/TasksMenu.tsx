import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonList,
  IonPopover,
  IonToggle,
} from "@ionic/react";
import { ellipsisHorizontal } from "ionicons/icons";

const TasksMenu = ({ handleDeleteDone, handleToggleDone, hideDone }) => {
  const [showPopoverEvent, setShowPopoverEvent] = useState(null);

  const handleDeleteClick = () => {
    handleDeleteDone();
    setShowPopoverEvent(null);
  };

  return (
    <>
      <IonPopover
        isOpen={!!showPopoverEvent}
        onDidDismiss={() => setShowPopoverEvent(null)}
        event={showPopoverEvent}
      >
        <IonList>
          <IonItem onClick={handleDeleteClick} data-cy="delete-done" button>
            Delete done
          </IonItem>
          <IonItem>
            Hide done
            <IonToggle
              slot="end"
              checked={hideDone}
              onIonChange={(e) => handleToggleDone(e.detail.checked)}
              data-cy="toggle-hide-done"
            ></IonToggle>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonButtons slot="end">
        <IonButton
          onClick={(e) => {
            e.persist();
            setShowPopoverEvent(e);
          }}
          data-cy="more-menu"
        >
          <IonIcon icon={ellipsisHorizontal} color="dark"></IonIcon>
        </IonButton>
      </IonButtons>
    </>
  );
};

export default TasksMenu;
