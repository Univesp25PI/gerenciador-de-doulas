package br.com.doula.manager.infrastructure.controllers.v1

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/teste")
class TestController {
    private val teste = "Teste"

    @GetMapping("/aaa")
    fun getTeste(): String{
        return "Deu Certo"
    }
}



