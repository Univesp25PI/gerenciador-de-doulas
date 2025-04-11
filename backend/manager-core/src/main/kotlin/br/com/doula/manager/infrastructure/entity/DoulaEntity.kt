package br.com.doula.manager.infrastructure.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime

@Entity
@Table(name = "Doula")
data class DoulaEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val name: String? = null,

    @Column(nullable = false)
    val phone: String? = null,

    @Column(nullable = false, unique = true)
    val email: String? = null,

    @CreationTimestamp
    @Column(name = "create_date")
    val createDate: LocalDateTime? = null,

    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null,

    @OneToMany(mappedBy = "doula", cascade = [CascadeType.ALL], orphanRemoval = true)
    val pregnantList: List<PregnantEntity> = emptyList()
)