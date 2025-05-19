@echo off
echo === Instalando dependencias necesarias ===
IF NOT EXIST node_modules (
  npm install prompt-sync
)
echo === Ejecutando script ECMAScript ===
node listaDeEnteros.mjs
pause
