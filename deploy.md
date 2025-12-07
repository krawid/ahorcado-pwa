# Guía de Despliegue - Ahorcado PWA

## Opción 1: GitHub Pages (requiere cuenta GitHub)

### Paso 1: Editar configuración
1. Abre `package.json` línea 6
2. Cambia `TU-USUARIO` por tu usuario de GitHub
3. Si tu repo se llama diferente a "ahorcado-pwa", cámbialo también en `vite.config.js` línea 6

### Paso 2: Crear repo en GitHub
1. Ve a https://github.com/new
2. Nombre: `ahorcado-pwa`
3. Público o Privado (como quieras)
4. NO inicialices con README
5. Crea el repositorio

### Paso 3: Subir código (copia y pega estos comandos)
```bash
cd ahorcado-pwa
git init
git add .
git commit -m "Initial commit - Ahorcado PWA"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/ahorcado-pwa.git
git push -u origin main
```

### Paso 4: Desplegar
```bash
npm run deploy
```

### Paso 5: Activar GitHub Pages
1. Ve a tu repo en GitHub
2. Settings > Pages
3. Source: selecciona branch "gh-pages"
4. Save

**Tu app estará en:** `https://TU-USUARIO.github.io/ahorcado-pwa`

---

## Opción 2: Netlify Drop (MÁS FÁCIL - sin GitHub)

### Paso 1: Hacer build
```bash
cd ahorcado-pwa
npm run build
```

### Paso 2: Desplegar
1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `ahorcado-pwa/dist`
3. Listo - te da la URL inmediatamente

**Ventaja:** No necesitas cuenta de GitHub, es literalmente arrastrar y soltar.

---

## ¿Cuál elegir?

- **Netlify Drop**: Más rápido, 2 minutos, sin configuración
- **GitHub Pages**: Más profesional, puedes actualizar con `npm run deploy`

