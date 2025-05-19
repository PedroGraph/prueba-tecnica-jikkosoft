# Prueba Técnica Jikkosoft

## Contenido del Proyecto

El proyecto consta de dos partes principales:

1. **Esquema de base de datos** (carpeta `1 - eesquema`)
   - Sentencia SQL para crear tablas que se encargarán de guardar la información para una plataforma de blogs

2. **Función de Búsqueda** (carpeta `2 - función`)
   - Script de línea de comandos que encuentra dos números en un array que suman un objetivo específico

3. **Gestión de Bibliotecas** (carpeta `3 - gestión de bibliotecas`)
   - Sistema web completo con frontend y backend
   - Frontend: React con TypeScript
   - Backend: Express con TypeScript


## Ejecución

### Gestión de Bibliotecas

#### Windows
```bash
# En la carpeta 3 - gestión de bibliotecas
double-click run.bat
```

#### Linux/macOS
```bash
# En la carpeta 3 - gestión de bibliotecas
chmod +x run.sh
./run.sh
```

### Función de Búsqueda

#### Windows
```bash
# En la carpeta 2 - función
double-click run.bat
```

#### Linux/macOS
```bash
# En la carpeta 2 - función
chmod +x run.sh
./run.sh
```

## Requisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- TypeScript (se instalará automáticamente si es necesario)

## Funcionalidad

### Gestión de Bibliotecas
- Sistema completo de gestión de bibliotecas
- CRUD de usuarios
- CRUD de libros
- Sistema de préstamos
- Interfaz moderna con React
- Backend robusto con Express

### Función de Búsqueda
- Encuentra dos números en un array que suman un objetivo específico
- Interfaz interactiva que solicita:
  - Lista de números separados por coma
  - Número objetivo
- Muestra los índices de los números que cumplen la condición

## Notas

- Los scripts `run.bat` y `run.sh` se encargan automáticamente de:
  - Instalar dependencias necesarias
  - Compilar archivos cuando sea necesario
  - Ejecutar el código
  - Mantener la ventana abierta para ver los resultados