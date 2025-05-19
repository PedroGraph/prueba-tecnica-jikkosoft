#!/bin/bash

echo "=== Instalando dependencias necesarias ==="
if [ ! -d "node_modules" ]; then
  npm install prompt-sync
fi

echo "=== Ejecutando script ECMAScript ==="
node listaDeEnteros.mjs
