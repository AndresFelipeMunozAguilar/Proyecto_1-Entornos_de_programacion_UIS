# Gestor de Información de Empleados 

El presente repositorio contiene el código fuente del primer proyecto de la asignatura entorno de programación de la Universidad Industrial de Santander, del grupo E1, para el semestre 2025-1. Este consiste en un gestor de información de empleados, mediante el cual y a través del uso de una cuenta, se puede gestionar la información de los empleados de una empresa u organización. <br> <br> 

La estructura del proyecto consta de una base de datos relacional que maneja la información de las cuentas y, a través, de las cuales se va a permitir o denegar el ingreso a las opciones de gestión de información de empleados. Por otro lado también permite un interfaz gráfica a través de la cual se puede modificar, crear, eliminar y/o obtener la información de los empleados que se encuentran en la base de datos. Finalmente la interacción entre el usuario y la base de datos se gestiona a través de una api realizada con Spring Boot, Tomcat Apache, Maven y, como lenguaje principal, Java.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas principales:

- **frontend**: Contiene los archivos relacionados con la interfaz gráfica del usuario (HTML, CSS, JS y Bootstrap).
- **demo**: Contiene el backend del proyecto, desarrollado con Spring Boot, incluyendo la lógica de negocio, controladores, servicios y configuración de seguridad.
- **.idea**: Archivos de configuración del entorno de desarrollo IntelliJ IDEA.
- **target**: Carpeta generada automáticamente por Maven que contiene los archivos compilados y empaquetados.

## Tecnologías Utilizadas

### Backend
- **Spring Boot**: Framework principal para el desarrollo del backend.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización de usuarios.
- **Spring Security**: Para la implementación de medidas de seguridad en la aplicación.

### Frontend
- **HTML**: Para la estructura de las páginas web.
- **CSS**: Para el diseño y estilos de las páginas.
- **JavaScript**: Para la lógica del lado del cliente.
- **Bootstrap**: Para el diseño responsivo y componentes predefinidos.

## Contenido de las Carpetas

### Carpeta `frontend`
Guarda los archivos necesarios para renderizar las vistas y manejar la interacción del usuario. Dentro de esta carpeta se encuentran:
- **pages**: Contiene las páginas HTML principales del proyecto.
- **styles**: Archivos CSS para los estilos personalizados.
- **scripts**: Archivos JavaScript para manejar la lógica del lado del cliente, como la interacción con la API y la manipulación del DOM.

### Carpeta `demo`
Contiene el backend del proyecto. Dentro de esta carpeta se encuentran:
- **src/main/java**: Código fuente principal del backend.
  - **controller**: Controladores que manejan las solicitudes HTTP y las rutas de la API.
  - **service**: Servicios que contienen la lógica de negocio.
  - **repository**: Interfaces para interactuar con la base de datos.
  - **model**: Clases que representan las entidades del sistema.
  - **configuration**: Configuración de seguridad y otros aspectos del backend.
- **src/main/resources**: Archivos de configuración, como `application.properties`.
- **src/test/java**: Pruebas unitarias y de integración.

### Carpeta `target`
Generada automáticamente por Maven, contiene los archivos compilados y empaquetados del proyecto. Esta carpeta no debe ser modificada manualmente.
