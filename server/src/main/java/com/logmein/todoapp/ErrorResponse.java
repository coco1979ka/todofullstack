package com.logmein.todoapp;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@Builder
public class ErrorResponse {
    private HttpStatus status;
    private String message;
    private String detail;
    @Builder.Default
    private LocalDateTime timeStamp = LocalDateTime.now(ZoneOffset.UTC);
}
