package br.com.doula.manager.infrastructure.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "Pregnant")
data class PregnantEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doula_id", nullable = false)
    val doula: DoulaEntity? = null,

    @Column(nullable = false)
    val name: String? = null,

    @Column(nullable = false)
    val phone: String? = null,

    @Column(nullable = false, unique = true)
    val email: String? = null,

    @Column(nullable = false)
    val age: Int? = null,

    @Column(name = "first_pregnancy", nullable = false)
    val firstPregnancy: Boolean? = null,

    @Column(name = "lmp_date", nullable = false)
    val lmpDate: LocalDate? = null,

    val comorbidities: String? = null,

    @CreationTimestamp
    @Column(name = "create_date")
    val createDate: LocalDateTime? = null,

    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null,

    @OneToMany(mappedBy = "pregnant", cascade = [CascadeType.ALL], orphanRemoval = true)
    val classList: List<LessonEntity> = emptyList()
)
