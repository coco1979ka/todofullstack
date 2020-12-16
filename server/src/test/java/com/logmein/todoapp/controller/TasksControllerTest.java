package com.logmein.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.logmein.todoapp.repository.TaskRepository;
import com.logmein.todoapp.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TasksController.class)
@AutoConfigureRestDocs
public class TasksControllerTest {

    @MockBean
    TaskService taskService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void canGetListOfTasks() throws Exception {
        TaskDTO taskDTO1 = TaskDTO.builder()
                .id("1")
                .text("First task")
                .build();
        TaskDTO taskDTO2 = TaskDTO.builder()
                .id("2")
                .text("Second Task")
                .build();

        Map<String, TaskDTO> tasks = new HashMap<>();
        tasks.put(taskDTO1.getId(), taskDTO1);
        tasks.put(taskDTO2.getId(), taskDTO2);

        Mockito.when(taskService.getAllTasks()).thenReturn(tasks);

        this.mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.*", hasSize(2)))
                .andDo(document("get-tasks"));
    }

    @Test
    void canCreateANewTask() throws Exception {
        TaskDTO newTaskDTO = TaskDTO.builder()
                .id("4")
                .text("New Task")
                .build();

        ObjectMapper mapper = new ObjectMapper();

        this.mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(newTaskDTO)))
                .andExpect(status().isCreated())
                .andDo(document("create-task"));

        Mockito.verify(taskService).createTask(newTaskDTO);
    }

    @Test
    void createTaskShouldReturnErrorWhenTextIsEmpty() throws Exception {
        TaskDTO newTaskDTO = TaskDTO.builder()
                .text("")
                .build();
        ObjectMapper mapper = new ObjectMapper();
        this.mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(newTaskDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.detail", is("Text must not be empty")))
                .andDo(document("create-task-error"));
    }

    @Test
    void canDeleteExistingTask() throws Exception {
        this.mockMvc.perform(delete("/api/tasks/3"))
                .andExpect(status().isOk());
        Mockito.verify(taskService).deleteTask("3");
    }

    @Test
    void canUpdateExistingTask() throws Exception {
        TaskDTO taskDTO = TaskDTO.builder()
                .id("3")
                .text("Foo")
                .done(true)
                .build();
        ObjectMapper mapper = new ObjectMapper();

        Mockito.when(taskService.updateTask("3", taskDTO)).thenReturn(taskDTO);

        this.mockMvc.perform(put("/api/tasks/" + taskDTO.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(taskDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(taskDTO.getId())))
                .andDo(document("update-existing-task"));
    }
}