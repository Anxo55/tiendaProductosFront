import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PerfilActualizarComponent } from './pages/perfil-actualizar/perfil-actualizar.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { ProductosCategoriasComponent } from './pages/productos-categorias/productos-categorias.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [

    {path: "", component: InicioComponent},
    {path: "productos", component: ProductosComponent},
    {path: "categorias", component: CategoriasComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "contacto", component: ContactoComponent},
    {path: "perfil", component: PerfilComponent},
    {path: "perfil-actualizar", component: PerfilActualizarComponent},
    {path: "producto/:id", component: DetalleProductoComponent},
    {path: "categoria/:id", component: ProductosCategoriasComponent},
    {path: "carrito", component: CarritoComponent}

];
