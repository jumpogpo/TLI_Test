package com.thanapat.tlitest.entity;

import java.util.List;

public class Insure {
    private List<Policy> policy;
    private String policyNo;
    private String policyType;
    private String status;
    private String agenID;

    public Insure() {

    }

    public Insure(List<Policy> policy, String policyNo, String policyType, String status, String agenID) {
        this.policy = policy;
        this.policyNo = policyNo;
        this.policyType = policyType;
        this.status = status;
        this.agenID = agenID;
    }

    public List<Policy> getPolicy() {
        return policy;
    }

    public void setPolicy(List<Policy> policy) {
        this.policy = policy;
    }

    public String getPolicyNo() {
        return policyNo;
    }

    public void setPolicyNo(String policyNo) {
        this.policyNo = policyNo;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAgenID() {
        return agenID;
    }

    public void setAgenID(String agenID) {
        this.agenID = agenID;
    }

    @Override
    public String toString() {
        return "Insure{" +
                "policy=" + policy +
                ", policyNo='" + policyNo + '\'' +
                ", policyType='" + policyType + '\'' +
                ", status='" + status + '\'' +
                ", agenID='" + agenID + '\'' +
                '}';
    }
}
