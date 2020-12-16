package com.logmein.todoapp.controller;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.media.*;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        Schema mapSchema = new MapSchema().addProperties("id", new ObjectSchema()
                .addProperties("id", new StringSchema().description("Unique identifier of task"))
                .addProperties("text", new StringSchema().description("Task description"))
                .addProperties("done", new BooleanSchema().description("Done state of task")));
        MediaType schema = new MediaType().schema(mapSchema);
        Content content = new Content().addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE, schema);

        return new OpenAPI()
                .components(new Components()
                        .addResponses("tasks", new ApiResponse()
                                .description("Map of tasks")
                                .content(content)));
    }
}