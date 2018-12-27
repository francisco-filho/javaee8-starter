# Sistema de Controle

**funcionalidade** Como *gestor* quero adicionar novos documentos para que as agências tenham conhecimento e possam envia-los  
**dado** inclusão e ativação de documento na parametrização  
**quando** *agência* logar no sistema  
**deve** exibir documentos recem adicionados  

**funcionalidade** Como *gestor*, ao alterar parametros de um documento quero que a nova versão seja criada sem alterar as versões anteriores para ter controle do histórico de alterações  
**quando** criada nova versão  
**deve** criar documento com o mesmo número, dados e versão incrementada +1  

**funcionalidade** Como *gestor* quero adicionar novos prefixos a parametrização de documento para poder agrupar todas as agências em um único lugar  
**quando** adicionado novo prefixo a parametrização do documento e versão ativada  
**deve** mostrar documento para o novo *prefixo* adicionado  

**funcionalidade** Como *gestor* quero definir periodicidade de envio dos arquivos para que os prazos legais sejam cumpridos  
**dado** configuração de documento  
**quando** periodicidade for mensal  
**deve** deve gerar 12 pendências, uma para cada mês  
**quando** periodicidade for bimestral  
**deve** deve gerar 6 pendências, uma para cada bimestre  
**quando** periodicidade for trimestral  
**deve** deve gerar 4 pendências, uma para cada trimestre  
**quando** periodicidade for semestral  
**deve** deve gerar 2 pendências, uma para cada semestre  

**funcionalidade** Como *gestor* quero ativar nova versão de documento para que as alterações fiquem disponíveis para as agências  
**dado** configuração anterior ativada  
**quando** ativar nova configuração  
**deve** exibir para as *agências* documentos adicionados na nova versão  
**deve** Não exibir documentos removidos na nova versão, se ainda não enviados  

**funcionalidade** Como *gestor* quero visualizar documentos enviados para validá-los  
**quando** logar no sistema  
**deve** ser exibidos os documentos enviados pelas agências e não validados   

**funcionalidade** Como *gestor* quero visualizar documento enviado para que possa valida-lo  
**dado** exibição de documento enviado  
**quando** clicar no botão *Download*  
**deve** baixar o arquivo e visualiza-lo  
**deve** ativar link *Validar*  

**funcionalidade** Como *gestor* quero visualizar documentos pendentes de envio para que possa solicitar providências 
**dado** documentos ainda não enviados com competência no mês corrente 
**quando** clicar no link *Pendentes* 
**deve** exibir todas as agências/documentos pendentes 
