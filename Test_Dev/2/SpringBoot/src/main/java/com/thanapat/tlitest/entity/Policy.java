package com.thanapat.tlitest.entity;

public class Policy {
    private String policyNo;
    private String status;
    private String agenID;

    public Policy() {

    }

    public Policy(String policyNo, String status, String agenID) {
        this.policyNo = policyNo;
        this.status = status;
        this.agenID = agenID;
    }

    public String getPolicyNo() {
        return policyNo;
    }

    public void setPolicyNo(String policyNo) {
        this.policyNo = policyNo;
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
        return "Policy{" +
                "policyNo='" + policyNo + '\'' +
                ", status='" + status + '\'' +
                ", agenID='" + agenID + '\'' +
                '}';
    }
}
