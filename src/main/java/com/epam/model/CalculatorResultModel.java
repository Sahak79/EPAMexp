package com.epam.model;

/**
 * Created by Sahak_Babayan on 2/26/2016.
 */
public class CalculatorResultModel {

    private String evalResult;

    private String message;

    public CalculatorResultModel(String evalResult, String message) {
        this.evalResult = evalResult;
        this.message = message;
    }

    public String getEvalResult() {
        return evalResult;
    }

    public void setEvalResult(String evalResult) {
        this.evalResult = evalResult;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
