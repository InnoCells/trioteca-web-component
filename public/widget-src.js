const IFRAME_SRC = 'http://trioteca.webcomponent.s3-website.eu-west-3.amazonaws.com';

class TriotecaWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  handleIframeEvent(e) {
    if (e.origin !== IFRAME_SRC) {
      return;
    }

    this.dispatchEvent(new CustomEvent('trioteca', { bubbles: true, detail: e.data }));
  }

  connectedCallback() {
    window.addEventListener('message', this.handleIframeEvent, false);
    const iframe = document.createElement('iframe');
    iframe.style = 'border: 0; height: 100%; width: 100%';
    iframe.src = `${IFRAME_SRC}?provinceId=${this.getAttribute('provinceId')}&price=${this.getAttribute(
      'price'
    )}&source=${this.getAttribute('source')}`;
    this.shadowRoot.appendChild(iframe);
  }
}

window.customElements.define('x-trioteca', TriotecaWidget);
