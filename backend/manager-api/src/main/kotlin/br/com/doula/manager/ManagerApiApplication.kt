package br.com.doula.manager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ManagerApiApplication

fun main(args: Array<String>) {
    runApplication<ManagerApiApplication>(*args)
}
