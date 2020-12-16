package com.logmein.todoapp.controller;

import com.logmein.todoapp.model.Task;
import lombok.Builder;
import lombok.Value;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Value
@Builder
public class TaskDTO {

    String id;

    @NotEmpty(message = "Text must not be empty")
    String text;

    @NotNull(message = "Done must not be null")
    @Builder.Default
    Boolean done = false;

    public static TaskDTO fromTask(Task task) {
        return TaskDTO.builder()
                .id(Long.toString(task.getId()))
                .done(task.getDone())
                .text(task.getText())
                .build();
    }
}
