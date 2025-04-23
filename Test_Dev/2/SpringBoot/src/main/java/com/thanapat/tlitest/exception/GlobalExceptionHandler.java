package com.thanapat.tlitest.exception;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletResponse response) {
        response.addHeader("responseDateTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));

        Map<String, Object> errors = new HashMap<>();
        errors.put("errorCode", "MISSING_REQUIRED_BODY");
        errors.put("status", HttpStatus.BAD_REQUEST.value());

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            errors.put("errorMessage", errorMessage);
        });

        return errors;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(InsuranceNotFoundException.class)
    @ResponseBody
    public Map<String, Object> handleInsuranceNotFoundException(InsuranceNotFoundException ex, HttpServletResponse response) {
        response.addHeader("responseDateTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));

        Map<String, Object> errors = new HashMap<>();
        errors.put("errorMessage", ex.getMessage());
        errors.put("errorCode", "INSURANCE_NOT_FOUND");
        errors.put("status", HttpStatus.NOT_FOUND.value());
        return errors;
    }
}