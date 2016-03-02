package com.epam.controller;

import com.epam.model.CalculatorResultModel;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

/**
 * Created by Sahak_Babayan on 2/26/2016.
 */
@Controller
public class CalculatorController {

    static Logger log = Logger.getLogger(CalculatorController.class);

    @RequestMapping(value = "/")
    public ModelAndView index(){
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/ajaxCalculator")
    public ModelAndView ajaxCalculator(){
        return new ModelAndView("ajaxCalculator");
    }


    @RequestMapping(value = "/calc", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public @ResponseBody
    CalculatorResultModel evaluate(@RequestBody String JSONExpression){

        Object result = new Object();
        String message = "success";
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode actualObj = mapper.readTree(JSONExpression);
            String runningTotal = actualObj.get("runningTotal").asText();
            String currentVal = actualObj.get("currentVal").asText();
            String executeAction = actualObj.get("executeAction").asText();

            ScriptEngineManager manager = new ScriptEngineManager();
            ScriptEngine engine = manager.getEngineByName("js");
            result = engine.eval(runningTotal+executeAction+currentVal);

        } catch (Exception e) {
            message = "There is issue while evaluating your expression";
            log.error("Error while evaluating expression",e);
        }

        return new CalculatorResultModel(result.toString(), message);
    }

}
