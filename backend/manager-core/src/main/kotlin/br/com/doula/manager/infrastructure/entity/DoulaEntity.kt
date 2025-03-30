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
@Table(name = "Doula")
data class DoulaEntity (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long? = null,
    @Column(name = "name")
    val name: String? = null,
    @Column(name = "phone")
    var phone: String? = null,
    @Column(name = "email")
    val email: String? = null,
    @CreationTimestamp
    @Column(name = "create_date", updatable = false)
    val createDate: LocalDateTime? = null,
    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null
)