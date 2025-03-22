plugins {
    id("org.springframework.boot") version "3.2.3"
    kotlin("jvm") version "1.9.22"
    `java-library`
}

group = "br.com.doula.manager"

dependencies {
    api("org.slf4j:slf4j-api:${property("slf4jApiVersion")}")

    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito.kotlin:mockito-kotlin:${property("mockitoKotlinVersion")}")
    testImplementation("org.mockito:mockito-junit-jupiter:${property("mockitoJUnitJupiterVersion")}")
    testImplementation("io.mockk:mockk:1.13.9")

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
    enabled = false
}
