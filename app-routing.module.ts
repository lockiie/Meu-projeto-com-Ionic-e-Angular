import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'cadproduto', loadChildren: './cadproduto/cadproduto.module#CadprodutoPageModule' },
  { path: 'venderproduto', loadChildren: './venderproduto/venderproduto.module#VenderprodutoPageModule' },
  { path: 'listvendas', loadChildren: './listvendas/listvendas.module#ListvendasPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'contasareceber', loadChildren: './contasareceber/contasareceber.module#ContasareceberPageModule' },
  { path: 'despesasmensais', loadChildren: './despesasmensais/despesasmensais.module#DespesasmensaisPageModule' },
  { path: 'carinho', loadChildren: './carinho/carinho.module#CarinhoPageModule' },
  { path: 'editar', loadChildren: './editar/editar.module#EditarPageModule' },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'caddespesas', loadChildren: './caddespesas/caddespesas.module#CaddespesasPageModule' },
  { path: 'funcionario', loadChildren: './funcionario/funcionario.module#FuncionarioPageModule' },
  { path: 'cadfuncionario', loadChildren: './cadfuncionario/cadfuncionario.module#CadfuncionarioPageModule' },
  { path: 'box', loadChildren: './box/box.module#BoxPageModule' },
  { path: 'cadbox', loadChildren: './cadbox/cadbox.module#CadboxPageModule' },
  { path: 'prejuizo', loadChildren: './prejuizo/prejuizo.module#PrejuizoPageModule' },
  { path: 'cadprejuizo', loadChildren: './cadprejuizo/cadprejuizo.module#CadprejuizoPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadlogin', loadChildren: './cadlogin/cadlogin.module#CadloginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
