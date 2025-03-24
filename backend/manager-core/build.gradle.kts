plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.spring") version "1.9.22"
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    `java-library`
}

group = "br.com.doula.manager"

repositories {
    mavenCentral()
}

dependencies {
    api(project(":manager-domain"))

    // Banco de dados SQL
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // PostgreSQL JDBC Driver (substitui o SQLite)
    implementation("org.postgresql:postgresql:42.7.1")

    // Flyway para migrações de banco de dados
    implementation("org.flywaydb:flyway-core")

    api("com.fasterxml.jackson.module:jackson-module-kotlin")
    api("org.jetbrains.kotlin:kotlin-reflect")
    api("org.springframework.boot:spring-boot-starter-actuator")
    api("org.springframework.boot:spring-boot-starter-web")
    api("org.springframework.boot:spring-boot-starter-validation")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito.kotlin:mockito-kotlin:${property("mockitoKotlinVersion")}")
    testImplementation("io.mockk:mockk:${property("mockkVersion")}")

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
    enabled = false
}