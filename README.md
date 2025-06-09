# Presentado por:
- Carlos Aguirre  
- Javier Donetch  
- Matías Romero  

# Tienda-E-commerce-Teclados-Personalizados

---

## Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)  
2. [Actualizaciones Realizadas](#actualizaciones-realizadas)  
3. [Requerimientos](#requerimientos)  
4. [Arquitectura de la Información](#flujos-de-navegación-del-landing-page)  
5. [Diseño de Prototipos](#prototipo-de-diseño)  
6. [Librerías Usadas](#librerías-usadas)  
7. [Tecnologías](#tecnologías-utilizadas)  
8. [Instalación](#instalación)

---

## Resumen del Proyecto

**Tienda-E-commerce-Teclados-Personalizados** es una plataforma web desarrollada con **Ionic + Angular** que permite a los usuarios armar su propio teclado mecánico seleccionando componentes como switches, keycaps, PCB y carcasa.

El proyecto está orientado a ofrecer una experiencia interactiva tanto para el cliente (usuario final), como para los administradores del sistema. Incluye funcionalidades como constructor de teclado, gestión de productos, filtros de búsqueda, generación de promociones y más.

Esta entrega contempla el diseño de la arquitectura, definición de requerimientos, prototipado en Figma y desarrollo de la estructura inicial del frontend.

---
## 🔄 Actualizaciones realizadas

- Se implementó un backend con Node.js y Express para el manejo de autenticación, usuarios y productos.
- Se añadió autenticación con tokens JWT y almacenamiento seguro del token en Ionic Storage.
- Se conectó el frontend de Angular con el backend mediante servicios HTTP.
- Se añadieron validaciones en los formularios de registro e inicio de sesión.
- Se creó un módulo de autenticación en Angular, separado y reutilizable.
- Se mejoró la gestión de estado del usuario autenticado.
- Se desarrolló un panel administrativo básico para la gestión de productos y promociones.
---

## Requerimientos

### Roles del Sistema

- 🛠️ **Administrador**: Tiene acceso completo al sistema. Puede crear, editar y eliminar productos, combos, promociones y gestionar configuraciones generales.
- 👤 **Usuario**: Rol general de cliente registrado en la plataforma. Puede navegar la tienda, personalizar teclados, guardar configuraciones y realizar compras.

---

## Requerimientos Funcionales (RF)


### RF1: Personalización Interactiva de Teclados
**Rol:** Usuario  
**Descripción:**  
El sistema debe incluir una sección llamada **"Arma tu teclado"**, accesible desde el menú principal, donde el usuario pueda personalizar su teclado.

**Funcionalidades:**
- Selección de componentes por categoría (Base, Switches, Keycaps, Cable, Accesorios).
- Botón de ayuda dentro de cada categoría explicando los tipos y subtipos.
- Validación automática de compatibilidad entre componentes.
- Opción para guardar la configuración (en la cuenta del usuario o como enlace temporal).

---

### RF2: Generación Dinámica de Códigos Promocionales
**Rol:** Administrador  
**Descripción:**  
Panel administrativo para crear, editar y eliminar códigos promocionales.

**Funcionalidades:**
- Crear códigos con distintos tipos de descuentos y restricciones.
- Editar o eliminar códigos con validaciones de seguridad.

---

### RF3: Tienda por Tipo de Producto
**Rol:** Usuario  
**Descripción:**  
Acceso a tienda de partes categorizadas para explorar y comprar componentes de teclado.

**Funcionalidades:**
- Filtrar productos por categoría.
- Botón de ayuda en cada categoría.
- Ordenar por precio, popularidad, etc.

---

### RF4: Formulario de Combos y Ofertas
**Rol:** Administrador  
**Descripción:**  
Crear y administrar combos especiales y ofertas.

**Funcionalidades:**
- Armar combos personalizados con selección de productos.
- Aplicar descuentos y restricciones de uso.

---

### RF5: Formulario de Nuevo Producto
**Rol:** Administrador  
**Descripción:**  
Agregar productos nuevos al catálogo.

**Funcionalidades:**
- Formulario con campos obligatorios (nombre, tipo, subtipo, precio, stock, compatibilidad, descripción e imágenes).

---

## Requerimientos No Funcionales (RNF)


### RNF1: Visualización de Precio Dinámico en Tiempo Real
**Rol:** Usuario  
**Descripción:**  
El precio total del teclado debe actualizarse de forma inmediata a medida que el usuario selecciona componentes, mejorando la fluidez y experiencia de uso.

---

### RNF2: Selector de Estética Inicial
**Rol:** Usuario  
**Descripción:**  
La pantalla de bienvenida debe permitir al usuario elegir una estética predeterminada para la interfaz, mejorando su personalización visual sin afectar las funcionalidades.

---

### RNF3: Carrusel de Productos con Navegación Optimizada
**Rol:** Usuario  
**Descripción:**  
El carrusel de productos destacados debe ofrecer:
- Lazy loading de imágenes para mejorar el tiempo de carga.
- Navegación por flechas y desplazamiento táctil en dispositivos móviles.

---

### RNF4: Persistencia de Configuraciones de Teclado
**Rol:** Usuario  
**Descripción:**  
Las configuraciones de teclado personalizadas deben poder guardarse y recuperarse correctamente entre sesiones.
(Aunque implica una función del sistema, se clasifica aquí por estar ligada a persistencia de datos y comportamiento esperado a nivel de experiencia de usuario y almacenamiento, no a una acción directa visible.)

---

### RNF5: Gestión Estable de Promociones
**Rol:** Administrador  
**Descripción:**  
La creación y edición de promociones debe realizarse sin afectar otras operaciones activas en la tienda.

---

### RNF6: Seguridad y Control de Acceso
**Rol:** Usuario y Administrador  
**Descripción:**  
El acceso a funcionalidades de administración debe estar restringido a administradores o editores, sin exposición para usuarios visualizadores.

---

### RNF7: Escalabilidad de la Plataforma
**Rol:** Usuario y Administrador  
**Descripción:**  
El sistema debe ser capaz de manejar más de 1000 productos sin pérdidas significativas de rendimiento en búsqueda, navegación o administración.

---

## 🔄 Flujos de Navegación del Landing Page
link de apoyo https://www.canva.com/design/DAGlO_EwYPM/n5XAu4L9lEuTTDRuS4Kz9w/edit?utm_content=DAGlO_EwYPM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

### 🧩 Flujo 1: Visualización de Productos Destacados
**🎯 Objetivo:** Ver productos destacados.  
**Pasos:**
1. El usuario accede al landing page.
2. Desliza o hace clic en el carrusel de productos destacados.
3. Visualiza distintos teclados destacados.
4. (Opcional) Hace clic en un producto → Redirige a la página de detalle del producto.

---

### 🔍 Flujo 2: Explorar Partes del Teclado
**🎯 Objetivo:** Conocer y explorar los componentes de un teclado.  
**Pasos:**
1. El usuario ve la sección **"¿Qué deseas comprar?"**.
2. Selecciona una categoría: *Keycaps*, *Switches* o *Marco*.
3. Hace clic en una imagen o botón → Es redirigido a una sección o página con más información y productos relacionados.

---

### ⚙️ Flujo 3: Armar tu Teclado
**🎯 Objetivo:** Personalizar un teclado desde cero.  
**Pasos:**
1. El usuario accede a la sección **"Arma tu teclado"**.
2. Selecciona una modalidad:
   - Armar en solitario.
   - Armar con ayuda.
3. Es redirigido al configurador de teclado.
4. Selecciona partes, estética y preferencias.
5. Agrega el teclado al carrito.

---

### 🎨 Flujo 4: Selección de Estética
**🎯 Objetivo:** Elegir un estilo visual para el teclado.  
**Pasos:**
1. El usuario llega a la sección **"Selecciona tu estética"**.
2. Hace clic en una estética (ej: Asiática, Steampunk, etc.).
3. Es redirigido a una galería de estilos o vista filtrada de productos con esa estética.
4. Puede previsualizar cómo lucen los teclados con esa temática.

---

### 💬 Flujo 5: Opiniones de Usuarios
**🎯 Objetivo:** Ver la experiencia de otros usuarios.  
**Pasos:**
1. El usuario navega a la sección **"Opiniones Usuarios"**.
2. Lee las reseñas visibles publicadas por otros compradores.

---

### 🔗 Flujo 6: Navegación desde el Footer
**🎯 Objetivo:** Acceder a otras secciones del sitio o medios de contacto.  
**Pasos:**
1. El usuario baja hasta el **footer** del landing.
2. Puede acceder a:
   - **Inicio**
   - **Ayuda**
   - **Más vendidos**
   - **Contacto** (correo o teléfono)

---

### 🛒 Flujo 7 (Implícito): Comprar
**🎯 Objetivo:** Comprar un producto personalizado o individual.  
**Pasos posibles:**
- Después de armar un teclado → Agregar al carrito.
- Desde productos destacados → Ver detalle → Agregar al carrito.
- Desde categorías de partes → Seleccionar parte → Agregar al carrito.

---

## Prototipo de Diseño

[Figma - Prototipo de Gestión de Productos](https://www.figma.com/team_invite/redeem/u9JntJiKIwNNdHLfrAdPMs)

---

## Librerías usadas con Angular
### Frontend (Angular + Ionic)

- `@ionic/angular`: Componentes UI optimizados para móviles.
- `@angular/forms`: Gestión avanzada de formularios reactivos.
- `@angular/router`: Manejo de rutas y navegación SPA.
- `@capacitor/storage`: Para persistencia de datos locales (tokens).
- `bootstrap`: Estilos CSS y sistema de grillas responsivas.
- `ngx-toastr`: Notificaciones emergentes para feedback al usuario.
- `rxjs`: Manejo de programación reactiva (observables).

### Backend (Node.js + Express)

- `express`: Framework para servidor y rutas HTTP.
- `cors`: Política de intercambio entre dominios.
- `dotenv`: Configuración de variables de entorno.
- `jsonwebtoken`: Tokens de autenticación seguros.

---

## ⚙️ Tecnologías utilizadas

### Frontend (Angular + Ionic)

- **Ionic Framework**: Componentes responsivos para interfaces móviles y web.
- **Angular**: Framework SPA para el desarrollo de interfaces modernas.
- **Angular Router**: Manejo de rutas en la navegación.
- **Reactive Forms**: Formularios dinámicos y validación.
- **HttpClient**: Comunicación con el backend.
- **Ionic Storage**: Almacenamiento de tokens JWT de sesión.

### Backend (Node.js + Express)

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para la creación de APIs REST.
- **jsonwebtoken**: Generación y verificación de tokens JWT.
- **cors**: Configuración de políticas de acceso entre dominios.

---

## ⚙️ Instalación

Para correr este proyecto en tu máquina local, sigue los siguientes pasos:

1. Clona este repositorio:

    ```
    git clone https://github.com/donetch/ApiPrueba.git
    ```

2. Navega al directorio del proyecto:

    ```
    cd ApiPrueba
    ```

3. Instala las dependencias:

    ```
    npm install
    ```

4. Corre la aplicación:

    ```
    npm run dev
    ```

Debes tener Node.js y Ionic instalados antes de ejecutar npm install y ionic serve.
---
🔌 Puertos en Localhost
- Frontend (Página Web): http://localhost:8100
- Backend (API REST): http://localhost:3000
