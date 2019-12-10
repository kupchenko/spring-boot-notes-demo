package me.kupchenko.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static me.kupchenko.util.Constant.Endpoint.SWAGGER_URL;

@Controller
public class SwaggerController {

    @GetMapping({"/swagger"})
    public String swaggerForward() {
        return "redirect:" + SWAGGER_URL;
    }

    @GetMapping("/")
    public String stdRedirect() {
        return "forward:/index.html";
    }
}
