package br.com.doula.manager.infrastructure.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime

@Entity
@Table(name = "Hello")
data class HelloEntity (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long? = null,
    @Column(name = "hello_string")
    val helloString: String? = null,
    @Column(name = "hello_list")
    var helloList: String? = null,
    @Column(name = "type")
    val type: String? = null,
    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    val createDate: LocalDateTime? = null,
    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null
)  {
    fun getHelloArrayAsList(): List<String> =
        helloList!!.split(",")
}