package com.logmein.todoapp.controller;

import com.logmein.todoapp.ErrorResponse;
import com.logmein.todoapp.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTaskNotFoundExcpetion() {
        ErrorResponse response = ErrorResponse.builder()
                .message("Task not found")
                .detail("A task with given ID could not be found")
                .status(HttpStatus.NOT_FOUND)
                .build();
        return new ResponseEntity<>(response, response.getStatus());
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException() {
        ErrorResponse response = ErrorResponse.builder()
                .message("Invalid Task format")
                .detail("")
                .status(HttpStatus.BAD_REQUEST)
                .build();
        return new ResponseEntity<>(response, response.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        ErrorResponse response = ErrorResponse.builder()
                .message("Invalid task format")
                .detail(exception.getBindingResult().getFieldError().getDefaultMessage())
                .status(HttpStatus.BAD_REQUEST)
                .build();
        return new ResponseEntity<>(response, response.getStatus());
    }
}
