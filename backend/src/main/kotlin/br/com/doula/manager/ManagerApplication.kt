package br.com.doula.manager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ManagerApplication {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<ManagerApplication>(*args)
        }
    }
}
