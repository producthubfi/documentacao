# HubFi · Protótipo da extensão

Simulação visual de como a extensão pode preencher o portal do banco quando o produto estiver pronto.

Abrir com o XAMPP ligado:

- Protótipo Itaú: [http://localhost/hubfi-components/extensao/](http://localhost/hubfi-components/extensao/)
- Spec para o time (5 bancos): [http://localhost/hubfi-components/extensao/spec.html](http://localhost/hubfi-components/extensao/spec.html)

## O que testar

1. A extensão detecta o Itaú e o step **Dados Pessoais**.
2. Clique em **Preencher formulário**. Nome, CPF, nascimento, telefone e e-mail entram no form.
3. **Ver detalhes** mostra o resultado, sem repetir os valores pessoais.
4. Clique em **Continuar** no Itaú (manual). A extensão passa a **Endereço**.
5. Preencha de novo. Complemento fica sem informação de propósito.

A CNH é de outro CPF (Honorio). Esses dados **não** entram no form do proponente (Herminio).
