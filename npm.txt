https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery

- Crear carpeta inicial vacía para proyecto
- Crear carpetas client y server (o frontend y backend)

######### CONFIG INICIAL #############
- En CLIENTE:
	// Crear aplicación React
	- npx create-react-app ./
	// Instalar paquetes a usar
	- npm install
		* axios: peticiones asíncronas a API
		* moment: tiempo y fechas
		* react-file-base64: imagenes base64
		* redux
		* redux-thunk: redux asíncrono
		* react-redux
		* @material-ui/core
- En SERVIDOR:
	// Crea package.json
	- npm init -y
	// Instalar paquetes a usar
	- npm install 
		* dotenv: constantes de entorno (.env)
		* body-parser: POST request
		* cors: para interactuar entre servidores (peticiones cruzadas)
		* express: framework para routing
		* mongoose: para manejar MongoDB
		* nodemon: reinicia servidor cuando hay cambios
	// Configurar Node.JS (package.json)
	- Poner type:module para habilitar uso de 'import'
	- scripts.start: "nodemon index.js" (archivo de entrada)
	// Archivo de entrada
	- Crear index.js e importar paquetes 

########## ESTRUCTURA DE CARPETAS ##############
- En CLIENTE
	* node-modules
	* public
	+ src
		+ actions (redux)
			xxx.js
		+ reducers (redux)
			index.js
			xxx.js
		+ images
		+ components
			Componente
				Subcomponente
					Subcomponente.js
					styles.js
				Componente.js
				styles.js

- En SERVIDOR:
	* node-modules
	+ controllers
		controlador.js
	+ models
		modelo.js
	+ routes
		rutas.js

########## NUEVA FUNCIONALIDAD - ORDEN DE CREACION ##############

1) Crear ruta correspondiente (server/routes/...)
2) Crear controlador asociado a esa ruta (server/controllers/...)

3) Implementar llamada API (client/api/index.js)
4) Crear la acción que llama a esa API (client/actions/...)
5) Crear el reductor que maneja la acción (client/reducers/...)
6) Enviar la acción desde el componente (client/components/...)

################## DOCKER ####################
# Crear volúmenes de almacenamiento
docker volume create dbdata
docker volume create dbconfig

# Crear red común
docker network create [nwName]

# Crear imagen back-end (NodeJS)
docker build -t [imgTagBE] [ruta=.]
# Crear imagen front-end (ReactJS)
docker build -t [imgTagFE] [ruta=.]

docker run --name [ctNameDB] --network [nwName] -p [localPort]:27017 -v dbdata:/data/dv -v dbconfig:/data/configdb [img=mongo]
docker run --name [ctNameBE] --network [nwName] -p [localPort]:[appPort] -d [imgTagBE]
docker run --name [ctNameFE] --network [nwName] -p [localPort]:[appPort] -d [imgTagFE]

-- SERVER Dockerfile --
FROM node
WORKDIR /app/server
COPY ./package.json /app/server/
RUN npm install
COPY . /app/server
EXPOSE 5000
CMD ["node", "index.js"]

# Entrar a un contenedor (debe estar en ejecución)
docker exec -it [ctName] bash