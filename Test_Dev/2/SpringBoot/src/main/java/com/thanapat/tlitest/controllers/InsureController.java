package com.thanapat.tlitest.controllers;

import com.thanapat.tlitest.dto.GetInsureDataDTO;
import com.thanapat.tlitest.entity.Insure;
import com.thanapat.tlitest.services.InsureService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/insure")
public class InsureController {
    private final InsureService insureService;

    @Autowired
    public InsureController(InsureService insureService) {
        this.insureService = insureService;
    }

    @PostMapping("")
    public Insure getInsureData(@Valid @RequestBody GetInsureDataDTO insureData, HttpServletResponse response) {
        Insure result = this.insureService.findInsureDataByName(insureData.getInsureName());
        response.addHeader("responseDateTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        return result;
    }
}
