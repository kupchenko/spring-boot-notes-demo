FROM openjdk:11
WORKDIR /app
ADD build/libs/notes-app-demo*.jar service.jar
ENTRYPOINT ["java", "-jar", "service.jar"]