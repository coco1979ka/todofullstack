import { IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";

type TaskErrorProps = {
  errorMessage: string;
  handleDismiss: () => void;
};

const TaskError = ({ errorMessage, handleDismiss }: TaskErrorProps) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    errorMessage ? setShowToast(true) : setShowToast(false);
  }, [errorMessage]);

  const dismiss = () => {
    handleDismiss();
  };

  return (
    <IonToast
      isOpen={showToast}
      position="top"
      color="danger"
      message={errorMessage}
      buttons={[
        {
          side: "start",
          icon: "close",
          handler: () => dismiss(),
        },
      ]}
    />
  );
};

export default TaskError;
