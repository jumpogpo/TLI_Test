package com.thanapat.tlitest.services;

import com.thanapat.tlitest.entity.Insure;
import com.thanapat.tlitest.entity.Policy;
import com.thanapat.tlitest.exception.InsuranceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InsureServiceAction implements InsureService {
    @Override
    public Insure findInsureDataByName(String insureName) {
        if (!insureName.equals("นายA1")) {
            throw new InsuranceNotFoundException("Insurance not found");
        }

        List<Policy> policy = new ArrayList<>();
        policy.add(new Policy("P0003", "A", "00000005"));

        return new Insure(policy, "P00031", "CL", "A", "00000005");
    }
}
