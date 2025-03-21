plugins {
    id("org.springframework.boot")
    kotlin("jvm")
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
