package br.com.doula.manager.infrastructure.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime

@Entity
@Table(name = "Class")
data class LessonEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregnant_id", nullable = false)
    val pregnant: PregnantEntity? = null,

    @Column(name = "class_number", nullable = false)
    val classNumber: Int? = null,

    @Column(name = "class_type", nullable = false)
    val classType: String? = null,

    @Column(name = "class_date", nullable = false)
    val classDate: LocalDateTime? = null,

    @CreationTimestamp
    @Column(name = "create_date")
    val createDate: LocalDateTime? = null,

    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null
)
