import { useState } from "react";
import axios from "axios";
import * as uuid from "uuid";
import useSWR from "swr";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

const fetcher = (url: string): Promise<Record<string, Task>> =>
  apiClient.get<Record<string, Task>>(url).then((res) => res.data);

const useTasks = () => {
  const [error, setError] = useState("");
  const { data: tasks, mutate, error: fetchError } = useSWR("/tasks", fetcher);

  const createTask = async (text: string) => {
    const newTask = {
      id: uuid.v4(),
      text,
      done: false,
    };
    await mutate((tasks) => {
      const newTasks = { ...tasks };
      newTasks[newTask.id] = newTask;
      return newTasks;
    }, false);
    try {
      await apiClient.post("/tasks", newTask);
    } catch (error) {
      setError(error.response.data);
    } finally {
      await mutate();
    }
  };

  const updateTask = async (task: Task) => {
    await mutate((tasks: Record<string, Task>) => {
      const newTasks = { ...tasks };
      newTasks[task.id] = { ...task };
      return newTasks;
    }, false);
    try {
      await apiClient.put("/tasks/" + task.id, task);
    } catch (error) {
      setError(error.response.data);
    } finally {
      await mutate();
    }
  };

  const deleteTask = async (task: Task) => {
    await mutate((tasks: Record<string, Task>) => {
      const newTasks = { ...tasks };
      delete newTasks[task.id];
      return newTasks;
    }, false);
    try {
      await apiClient.delete("/tasks/" + task.id);
    } catch (error) {
      setError(error.response.data);
    } finally {
      await mutate();
    }
  };

  const deleteDone = async (task: Task) => {
    const tasksToDelete = Object.entries(tasks!).filter(
      ([_, task]) => task.done === true
    );
    await mutate((tasks) => {
      const newTasks = { ...tasks };
      tasksToDelete.map(([id, _]) => delete newTasks[id]);
      return newTasks;
    }, false);

    try {
      await Promise.all(
        tasksToDelete.map(
          async ([_, task]) => await apiClient.delete(`/tasks/${task.id}`)
        )
      );
    } catch (error) {
      setError(error.response.data);
    } finally {
      await mutate();
    }
  };

  const dismissError = () => {
    setError("");
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    fetchError,
    error,
    deleteDone,
    dismissError,
  };
};

export default useTasks;
