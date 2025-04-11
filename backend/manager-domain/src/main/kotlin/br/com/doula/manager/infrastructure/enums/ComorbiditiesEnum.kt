package br.com.doula.manager.infrastructure.enums

enum class ComorbiditiesEnum(val description: String) {
    HYPERTENSION("Hipertensão"),
    DIABETES("Diabetes Mellitus"),
    OBESITY("Obesidade"),
    THYROID_DISORDER("Distúrbio da Tireoide"),
    ASTHMA("Asma"),
    ANEMIA("Anemia"),
    HIV("HIV"),
    LUPUS("Lúpus"),
    RENAL_DISEASE("Doença Renal Crônica"),
    CARDIOPATHY("Cardiopatia"),
    EPILEPSY("Epilepsia"),
    DEPRESSION("Depressão"),
    TUBERCULOSIS("Tuberculose"),
    HEPATITIS("Hepatite B ou C");

    companion object {
        fun listToString(comorbidities: List<ComorbiditiesEnum>): String? =
            if (comorbidities.isEmpty()) null
            else comorbidities.joinToString(",") { it.name }

        fun stringToList(value: String?): List<ComorbiditiesEnum> =
            value
                ?.split(",")
                ?.mapNotNull { runCatching { valueOf(it.trim()) }.getOrNull() }
                ?: emptyList()
    }
}