class LoginPage extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
        <user-login></user-login>
        <alert-message></alert-message>
        `;

        this.userLogin = this.shadowRoot.querySelector("user-login");
        this.alertMessage = this.shadowRoot.querySelector("alert-message");

        this.userLogin.addEventListener("onLogin", this.handleLogin.bind(this));
        
    }


    handleLogin(e) {

        const {type, message} = e.detail;

        console.log(e.detail);

        this.alertMessage.setAttribute("type", type);
        this.alertMessage.setAttribute("message", message);

    }
}

customElements.define("login-page", LoginPage);