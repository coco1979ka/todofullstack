package com.logmein.todoapp.controller;

import com.logmein.todoapp.service.TaskService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Log
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TasksController {

    private final TaskService taskService;

    public TasksController(TaskService taskService) {

        this.taskService = taskService;
    }

    @ApiResponse(ref="#/components/responses/tasks")
    @GetMapping("/tasks")
    public Map<String, TaskDTO> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/tasks")
    public ResponseEntity<TaskDTO> createTask(@Validated @RequestBody TaskDTO taskDTO) {
        log.info("Creating new task " + taskDTO.getText());
        return new ResponseEntity<>(this.taskService.createTask(taskDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable String id) {
        this.taskService.deleteTask(id);
    }

    @PutMapping("/tasks/{id}")
    public TaskDTO updateTask(@PathVariable String id, @Validated @RequestBody TaskDTO taskDTO) {
        return this.taskService.updateTask(id, taskDTO);
    }
}
