class TriotecaWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const iframe = document.createElement('iframe');
    iframe.style = 'border: 0; height: 100%; width: 100%';
    iframe.src =
      'http://trioteca.webcomponent.s3-website.eu-west-3.amazonaws.com?provinceId=' +
      this.getAttribute('provinceId') +
      '&price=' +
      this.getAttribute('price') +
      '&source=' +
      this.getAttribute('source');
    this.shadowRoot.appendChild(iframe);
  }
}

window.customElements.define('x-trioteca', TriotecaWidget);
