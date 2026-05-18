# ==========================================
# Etapa 1: Construcción (Build Stage)
# ==========================================
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copiar archivos de dependencias para aprovechar el caché de capas de Docker
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente del proyecto
COPY . .

# Compilar la aplicación para producción (genera la carpeta dist)
RUN npm run build

# ==========================================
# Etapa 2: Servidor de Producción (Nginx)
# ==========================================
FROM nginx:stable-alpine AS production-stage

# Copiar los archivos construidos de la etapa anterior al directorio de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx para SPA y optimizaciones
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 del contenedor
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
