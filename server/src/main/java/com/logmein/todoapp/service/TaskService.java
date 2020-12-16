package com.logmein.todoapp.service;

import com.logmein.todoapp.TaskNotFoundException;
import com.logmein.todoapp.controller.TaskDTO;
import com.logmein.todoapp.model.Task;
import com.logmein.todoapp.repository.TaskRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Map<String, TaskDTO> getAllTasks() {
       return this.taskRepository.findAll().stream()
               .collect(Collectors.toMap(task -> Long.toString(task.getId()), TaskDTO::fromTask));
    }

    public TaskDTO updateTask(@NotNull String id, @NotNull TaskDTO taskDTO) {
        long taskId = Long.parseLong(id);
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (!optionalTask.isPresent())
            throw new TaskNotFoundException("Task with ID " + taskDTO.getId() + "not found");
        Task task = optionalTask.get();
        task.setDone(taskDTO.getDone());
        task.setText(taskDTO.getText());
        Task savedTask = this.taskRepository.save(task);
        return TaskDTO.fromTask(savedTask);
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = createTaskFromDTO(taskDTO);
        Task savedTask = this.taskRepository.save(task);
        return TaskDTO.fromTask(savedTask);
    }

    public void deleteTask(String id) {
        this.taskRepository.deleteById(Long.parseLong(id));
    }

    private Task createTaskFromDTO(TaskDTO taskDTO) {
        return Task.builder()
                .text(taskDTO.getText())
                .done(taskDTO.getDone())
                .build();
    }


}
