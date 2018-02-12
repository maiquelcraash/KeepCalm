#KeepCalm
Conjunto de serviços para a mineração a partir do Twitter, pré-processamento, armazenamento, treinamento e classificação de textos da internet.

### Twitter API Documentation
https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html

### Natural Node API Documentation
https://github.com/NaturalNode/natural

### Serviços
Todos os serviços podem ser localizados e iniciados a partir da pasta *main-services/*:
 - **miner.js:**
    - Responsável por obter tweets com base em palavras-chave agressivas configuradas no arquivo *config/properties.js*
    - O serviço também processa tweets não agressivos para fim de treinamento nos dois viéses
    - Todos os dados são salvos na coleção *rawTweets* no mongodb
 - **preProcessor.js:**
    - Responsável por retirar símbolos inúteis
    - Padronizar o texto e remover palavras não relevantes (*stop words*)
    - Extrair o radical das palavras (processo de *steeming*)
    - Salvar dados processados na coleção *posTweets* no mongodb
 - **classifier.js**
    - Responsável por treinar os algoritmos e classificar textos requeridos
    - Cria um servidor que escutará na porta indicada no arquivo *config/properties.js*

### Informações adicionais
 - Deve-se iniciar o mongoDB previamente após configurar sua URL e porta no arquivo *config/properties.js*:
    - $ mongod
 - Deve-se incluir mais memória ao V8 para rodar o algoritmo:
    - $ node --max-old-space-size=4096 classifier.js
    
    
### Conclusões Prévias
 - O método da regressão logística consome muito mais memória que o método de Bayes, pois precisa manter o campo amostral completo. Exito obtido apenas com uma limitação em 5 mil registros no treinamento e leva muitos minutos para treinar.