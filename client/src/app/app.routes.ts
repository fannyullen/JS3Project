import { Routes } from '@angular/router';
import { HomeComponent } from './routes/Public/Home/home.component';
import { ProductDetailsComponent } from './routes/Public/product-details/product-details.component';
import { NewProductComponent } from './routes/admin/new-product/new-product.component';
import { AdminTableComponent } from './routes/admin/admin-table/admin-table/admin-table.component';
import { CartComponent } from './routes/Public/cart/cart.component';
import { RegisterComponent } from './routes/Public/register/register.component';
import { SearchResultComponent } from './routes/Public/search-result/search-result.component';
import { PublicLayoutComponent } from './routes/Public/public-layout/public-layout.component';
import { AdminLayoutComponent } from './routes/admin/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: "",
        component: PublicLayoutComponent,
        children: [
            { path: "", component: HomeComponent},
            { path: "products/:urlSlug", component: ProductDetailsComponent },
            { path: "cart", component: CartComponent },
            { path: "register", component: RegisterComponent },
            { path: "search/result", component: SearchResultComponent }
        ]
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminTableComponent},
            { path: 'product/new', component: NewProductComponent}
        ]
    }
   
    /* { path: "products/new", component: NewProductComponent },
    { path: "admin/table", component: AdminTableComponent } */
];
