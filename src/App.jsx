import React, { } from 'react'
import { Route, Switch } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AppContextProvider } from './store/app-context'

import Login from './views/HomeLoginSair/Login'
import Sair from './views/HomeLoginSair/Sair'

import Home from './views/HomeLoginSair/Home'

/*
import Socios from './views/Socios/Socios'
import EditaSociosScreen from './views/Socios/EditaSocios'
import NovoSocio from './views/Socios/NovoSocio'
*/

import Montadores from './views/Montadores/Montadores'
import EditaMontador from './views/Montadores/EditaMontador'
import NovoMontador from './views/Montadores/NovoMontador'

import Montagens from './views/Montagens/Montagens'
import EditaMontagem from './views/Montagens/EditaMontagem'
import NovaMontagem from './views/Montagens/NovaMontagem'

import NovoProduto from './views/Montagens/NovaMontagemProduto'
import EditaProduto from './views/Montagens/EditaMontagemProduto'

/*
import RamoAtividades from './views/RamoAtividades/RamoAtividades'
import EditaRamoAtividades from './views/RamoAtividades/EditaRamoAtividades'
import NovoRamoAtividades from './views/RamoAtividades/NovoRamoAtividades'

import Usuarios from './views/Usuarios/Usuarios'
import NovoUsuario from './views/Usuarios/NovoUsuario'
import EditaUsuarios from './views/Usuarios/EditaUsuarios'

import Dependentes from './views/Dependentes/Dependentes'
import EditaDependentes from './views/Dependentes/EditaDependentes'
import NovoDependente from './views/Dependentes/NovoDependente'
*/

import EsqueceuSenha from './views/EsqueceuSenha/EsqueceuSenha'
import ConfirmaSenhaEsqueceu from './views/EsqueceuSenha/ConfirmaSenhaEsqueceu'

import Autenticacao from './views/DadosPessoais/Autenticacao'
import DadosPessoais from './views/DadosPessoais/DadosPessoais'

import AlterarSenha from './views/AlteraSenha/AlterarSenha'
import ConfirmaSenha from './views/AlteraSenha/ConfirmaSenha'

/*
import Vendas from './views/Vendas/Vendas'
import NovaVenda from './views/Vendas/NovaVenda'
import EditaVenda from './views/Vendas/EditaVenda'

import Pagtos_Convenios from './views/relatorios/Convenios/Pagamentos'
import Descontos_Associados from './views/relatorios/Associados/Descontos'
import Historicos_Associados from './views/relatorios/Associados/Historicos'
*/

function App() {
  const queryClient = new QueryClient()

  return (

    <React.Fragment>

      <main className="container p-6 mx-auto mt-0 xl:w-screen-xl">
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <Switch>

              <Route path="/" exact>
                <Login />
              </Route>

              <Route path="/sair">
                <Sair />
              </Route>

              <Route path="/home">
                <Home />
              </Route>


              {/* SOCIOS **/}

              {/*}
              <Route path="/socios">
                <Socios />
              </Route>
              <Route path="/novo/socio">
                <NovoSocio />
              </Route>
              <Route path="/editaSocios/:id">
                <EditaSociosScreen />
              </Route>

              <Route path="/dependentes">
                <Dependentes />
              </Route>
              <Route path="/novo/dependente/:matricula">
                <NovoDependente />
              </Route>
              <Route path="/edita_dependentes/:id">
                <EditaDependentes />
              </Route>
              */}


              {/* MONTADORES **/}


              <Route path="/montadores">
                <Montadores />
              </Route>
              <Route path="/novo/montador">
                <NovoMontador />
              </Route>
              <Route path="/editaMontador/:id">
                <EditaMontador />
              </Route>

              {/* MONTADORES **/}


              <Route path="/montagens">
                <Montagens />
              </Route>
              <Route path="/nova/montagem">
                <NovaMontagem />
              </Route>
              <Route path="/editaMontagem/:id">
                <EditaMontagem />
              </Route>

              <Route path="/novo/produto">
                <NovoProduto />
              </Route>
              <Route path="/editaProduto/:id">
                <EditaProduto />
              </Route>

              {/* RAMO DE ATIVIDADES **/}

              {/*
              <Route path="/ramo">
                <RamoAtividades />
              </Route>
              <Route path="/novo/ramo">
                <NovoRamoAtividades />
              </Route>
              <Route path="/edita_ramo/:id">
                <EditaRamoAtividades />
              </Route>
              */}

              {/* USUARIOS **/}

             {/*
              <Route path="/usuarios">
                <Usuarios />
              </Route>
              <Route path="/user/novo">
                <NovoUsuario />
              </Route>

              <Route path="/editaUsuarios/:id">
                <EditaUsuarios />
              </Route>
            */}

              <Route path="/esqueceu_senha">
                <EsqueceuSenha />
              </Route>
              <Route path="/confirma_senha_esqueceu">
                <ConfirmaSenhaEsqueceu />
              </Route>

              <Route path="/autenticacao">
                <Autenticacao />
              </Route>

              <Route path="/atualizar_cadastro">
                <DadosPessoais />
              </Route>

              <Route path="/alterar_senha">
                <AlterarSenha />
              </Route>

              <Route path="/confirma_senha">
                <ConfirmaSenha />
              </Route>

              {/* VENDAS **/}

              {/*
              <Route path="/vendas">
                <Vendas />
              </Route>
              <Route path="/nova/venda">
                <NovaVenda />
              </Route>
              <Route path="/editaVenda/:id">
                <EditaVenda />
              </Route>
          */}

              {/* RELATORIOS **/}


              {/*convênios*/}

             {/*
              <Route path="/pagtos_convenios">
                <Pagtos_Convenios />
              </Route>

              {/*associados*/}

              {/*  
              <Route path="/descontos_associados">
                <Descontos_Associados />
              </Route>

              <Route path="/historico_associados">
                <Historicos_Associados />
              </Route>
              */}

            </Switch>
          </AppContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </React.Fragment>
  )
}

export default App
