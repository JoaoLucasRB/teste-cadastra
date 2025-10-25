export default `
    <section aria-label="@Nome_do_produto" class="product-item-container">
      <a href="" aria-label="Acessar PDP para o produto @Nome_do_produto" class="product-item-clearLink">
        <article class="product-item-element">
          <div class="product-item-image-wrapper">
            <div class="product-item-image-container" aria-label="Imagem do produto @Nome_do_produto">
              <img src="@Imagem_do_produto" class="product-item-image-element" />
            </div>
          </div>
          <div class="product-item-name-wrapper" aria-label="Nome do produto @Nome_do_produto">
            <h3 class="product-item-name-container">
              <span class="product-item-name-element">
                @Nome_do_produto
              </span>
            </h3>
          </div>
          <div class="product-item-listprice-wrapper" aria-label="Preço do @Nome_do_produto">
            <div class="product-item-listprice-container">
              <span class="product-item-listprice-element">@Preco_do_produto</span>
            </div>
          </div>
          <div class="product-item-installment-wrapper" aria-label="Parcelmento do @Nome_do_produto">
            <div class="product-item-installment-container">
              <span class="product-item-installment-element">@Parcelamento_do_produto</span>
            </div>
          </div>
          <div class="product-item-button-wrapper" aria-label="Botão do @Nome_do_produto">
            <div class="product-item-button-container">
              <button class="product-item-button-element">
                <span class="product-item-button-text">
                  Comprar
                </span>
              </button>
            </div>
          </div>
        </article>
      </a>
    </section>
  `