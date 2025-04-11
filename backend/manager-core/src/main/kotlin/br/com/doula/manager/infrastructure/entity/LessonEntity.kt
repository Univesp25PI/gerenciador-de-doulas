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
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregnant_id", nullable = false)
    val pregnant: PregnantEntity,

    @Column(name = "class_number", nullable = false)
    val classNumber: Int,

    @Column(name = "class_type", nullable = false)
    val classType: String,

    @Column(name = "class_date", nullable = false)
    val classDate: LocalDateTime,

    @CreationTimestamp
    @Column(name = "create_date")
    val createDate: LocalDateTime? = null,

    @UpdateTimestamp
    @Column(name = "update_date")
    val updateDate: LocalDateTime? = null
)
