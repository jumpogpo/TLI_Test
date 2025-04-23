package com.thanapat.tlitest.interceptors;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class HeaderInterceptor implements HandlerInterceptor {
    private static final String MESSAGE_ID = "messageId";
    private static final String SENT_DATE_TIME = "sentDateTime";
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String messageId = request.getHeader(MESSAGE_ID);
        String sentDateTime = request.getHeader(SENT_DATE_TIME);

        List<String> missingHeaders = validateRequiredHeaders(messageId, sentDateTime);

        if (!missingHeaders.isEmpty()) {
            sendErrorResponse(response, "MISSING_REQUIRED_HEADERS",
                    missingHeaders.size() > 1
                            ? "Required headers missing: " + String.join(", ", missingHeaders)
                            : "Required header missing: " + missingHeaders.get(0));
            return false;
        }

        // Validate sentDateTime format
        try {
            LocalDateTime.parse(sentDateTime, DATE_TIME_FORMATTER);
        } catch (DateTimeParseException e) {
            sendErrorResponse(response, "INVALID_DATE_TIME_FORMAT",
                    "Please use ISO DateTime format (e.g. 2023-07-15T08:30:45Z)");
            return false;
        }

        response.addHeader(MESSAGE_ID, messageId);
        response.addHeader(SENT_DATE_TIME, sentDateTime);
        return true;
    }

    private List<String> validateRequiredHeaders(String messageId, String sentDateTime) {
        List<String> missingHeaders = new ArrayList<>();

        if (!StringUtils.hasText(messageId)) {
            missingHeaders.add(MESSAGE_ID);
        }

        if (!StringUtils.hasText(sentDateTime)) {
            missingHeaders.add(SENT_DATE_TIME);
        }

        return missingHeaders;
    }

    private void sendErrorResponse(HttpServletResponse response, String errorCode, String errorMessage) throws IOException {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("errorCode", errorCode);
        errorResponse.put("errorMessage", errorMessage);

        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
