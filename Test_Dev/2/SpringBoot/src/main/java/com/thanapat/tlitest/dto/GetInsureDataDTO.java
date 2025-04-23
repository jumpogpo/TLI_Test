package com.thanapat.tlitest.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GetInsureDataDTO {
    @Valid
    @NotNull(message = "insureName is mandatory")
    @NotBlank(message = "insureName is mandatory")
    private String insureName;

    public String getInsureName() {
        return insureName;
    }
}
