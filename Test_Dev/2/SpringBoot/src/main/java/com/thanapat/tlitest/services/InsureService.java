package com.thanapat.tlitest.services;

import com.thanapat.tlitest.entity.Insure;

public interface InsureService {
    Insure findInsureDataByName(String insureName);
}
