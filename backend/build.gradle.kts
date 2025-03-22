buildscript {
    repositories {
        mavenCentral()
    }
}

plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.spring") version "1.9.22"
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management")  version "1.1.4"
}

group = "br.com.doula.manager"

allprojects {
    apply(plugin = "java")

    java {
        toolchain {
            languageVersion = JavaLanguageVersion.of(21)
        }
    }

    configurations {
        compileOnly {
            extendsFrom(configurations.annotationProcessor.get())
        }
    }

    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "io.spring.dependency-management")
    apply(plugin = "kotlin")
    apply(plugin = "org.jetbrains.kotlin.plugin.spring")

    dependencyManagement {
        imports {
            mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
        }
    }

    kotlin {
        compilerOptions {
            freeCompilerArgs.addAll("-Xjsr305=strict")
        }
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}

dependencies {
    implementation(project(":manager-core"))

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mockito:mockito-core:${property("mockitoCoreVersion")}")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito.kotlin:mockito-kotlin:${property("mockitoKotlinVersion")}")
    testImplementation("io.mockk:mockk:${property("mockkVersion")}")
    testImplementation("org.junit.jupiter:junit-jupiter-api")

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
}