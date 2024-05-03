class AlertMessage extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({ mode: "open" });

    }

    // Elijo los atributos que quiero observar que cambiarán con el vento onLogin
    static get observedAttributes() {
        return ['type', 'message'];
    }

    // Cada vez que cambien los atributos se ejecuta está función, hace al componente reactivo.
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {

        // Recojo la información de los atributos.
        const type = this.getAttribute('type');
        const message = this.getAttribute('message');

        let alertClass = '';

        // Con un switch defino el color de la alerta en función del tipo que he recibido por atributo.
        switch (type) {
            case 'success':
                alertClass = 'alert-success';
                break;
            case 'error':
                alertClass = 'alert-error';
                break;
            
            case 'info':
                alertClass = "alert-info";
                break;
            default:
                alertClass = '';
                break;
        }

        // Con un ternario compruebo si existe el tipo. Si existe pongo el mensaje dentro de un div con la clase predefinida en el
        // switch para poner el color correcto. Si no existe tipo no muestro el mensaje.
        this.shadowRoot.innerHTML = `
        <style>
            .alert-success { color: green; }
            .alert-error { color: red; }
            .alert-info {color: blue; }
        </style>
        <div class="${alertClass}">
            ${ type ? message : '' }
        </div>
    `;
    }
}

customElements.define("alert-message", AlertMessage);
