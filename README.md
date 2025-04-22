# Gestor de Información de Empleados 

Este proyecto consiste en un gestor de información de empleados, mediante el cual y a través del uso de una cuenta, se puede gestionar la información de los empleados de una empresa u organización. <br> <br> 

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

## Cómo Ejecutar el Proyecto

Para ejecutar el proyecto correctamente, siga los pasos a continuación:

### Requisitos Previos
1. **Visual Studio Code (VS Code)**: Asegúrese de tener instalado VS Code en su sistema.
2. **Extensión Live Server**: Instale la extensión Live Server en VS Code.
3. **Java JDK**: Asegúrese de tener instalado Java Development Kit (JDK) en su sistema.
4. **Maven**: Verifique que Apache Maven esté instalado y configurado en su sistema.

### Pasos para Ejecutar el Proyecto

#### 1. Ejecutar el Frontend
1. Abra la carpeta `frontend` del proyecto en VS Code.
2. Localice el archivo `index.html`.
3. Haga clic derecho sobre el archivo `index.html` y seleccione la opción **"Open with Live Server"**.
4. Esto abrirá el archivo en su navegador predeterminado.

#### 2. Ejecutar el Backend
1. Navegue a la carpeta `demo` del proyecto.
2. Abra una ventana de **cmd** (símbolo del sistema) con privilegios de administrador.
3. Ejecute el siguiente comando para iniciar el backend:
    ```bash
    mvn spring-boot:run
    ```
4. Espere a que el servidor Spring Boot se inicie correctamente.

#### 3. Iniciar Sesión y Usar la Aplicación
1. Una vez que el frontend y el backend estén en ejecución, abra el navegador donde se cargó el `index.html`.
2. Inicie sesión utilizando las siguientes credenciales de prueba:
    - **Correo electrónico**: `prueba@email.com`
    - **Contraseña**: `1234`
3. Use los botones disponibles en la interfaz para gestionar la información de los empleados.

### Notas Adicionales
- Asegúrese de que el puerto utilizado por Live Server no entre en conflicto con el puerto del backend (por defecto, el backend usa el puerto `8080`).
- Si encuentra problemas, revise los logs del backend en la consola para identificar posibles errores.
