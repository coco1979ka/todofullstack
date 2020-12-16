import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../api/tasks";
import { ErrorMessage } from "./ErrorMessage";

type TaskFormProps = {
  handleSubmit: (text: string) => void;
  handleReset: () => void;
  task?: Task;
};

const TaskForm = ({
  handleSubmit: handleSubmitForm,
  handleReset,
  task,
}: TaskFormProps) => {
  const { handleSubmit, control, errors, reset, clearErrors } = useForm({
    defaultValues: task,
  });

  const onSubmit = (data: Task) => {
    console.log(data);
    handleSubmitForm(data.text);
    console.log("Errors", errors);
    reset();
  };

  const resetForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleReset();
  };

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={resetForm}>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel
                  position="floating"
                  color={errors.text ? "danger" : "primary"}
                >
                  New Task
                </IonLabel>
                <Controller
                  name="text"
                  control={control}
                  defaultValue={task ? task.text : ""}
                  rules={{ required: true }}
                  render={(props) => (
                    <IonInput
                      id="text"
                      type="text"
                      value={props.value}
                      onIonChange={(e) => {
                        if (!task || e.detail.value !== task.text)
                          props.onChange(e.detail.value?.trim());
                      }}
                      clearInput
                    />
                  )}
                />
              </IonItem>
              {errors.text && (
                <ErrorMessage>Task must have a description.</ErrorMessage>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              size="6"
              sizeLg="6"
              size-md="6"
              sizeSm="0"
              sizeXs="0"
            />
            <IonCol>
              {task && (
                <IonButton
                  type="reset"
                  fill="outline"
                  id="reset"
                  expand="block"
                >
                  Cancel
                </IonButton>
              )}
            </IonCol>
            <IonCol>
              <IonButton type="submit" id="submit" expand="block">
                {!task ? "Add" : "Save"}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </form>
  );
};

export default TaskForm;
