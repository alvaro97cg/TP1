class UserLogin extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({ mode:"open" });


        this.users = [
            {username: "admin", password: "admin"}
        ];

    }
    
    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <form>
                <label for="inputUsername">Username</label>
                <input type="text" id="inputUsername">

                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword">

                <button class="btn">Enviar</button>
            </form>   
        `;

        const form = this.shadowRoot.querySelector('form');
        form.addEventListener('submit', (event) => this.submitForm(event));

    }
    

    submitForm(event){
        event.preventDefault();
        
        const username = this.shadowRoot.getElementById('inputUsername').value;
        const password = this.shadowRoot.getElementById('inputPassword').value;

        let alertType;
        let alertMessage;

        // Compruebo que todos los campos hayan sido rellenados. Si están todos rellenados, paso a buscar el usuario
        // Esta forma me gusta pero creo que puede ser un poco lioso, preguntar a Leonardo si hay una mejor forma de organizarlo.
        if (username === "" || password === "") {
            alertType = "info";
            alertMessage = "Ningún campo puede estar vacío";
        }else{
            // Busco si existe el usuario y si es correcto.
            const userMatch = this.users.find(
                user => user.username === username && user.password === password
            );
    
            // Si es correcto añado success, si no, error.
            if (userMatch) {
                alertType = "success";
                alertMessage = "Login exitoso."
            }else{
                alertType = "error";
                alertMessage = "Usuario no encontrado"
            }
    
        }
        
        // Creo el evento utilizando las variables generadas anteriormente.
        this.dispatchEvent(
            new CustomEvent("onLogin", {
                detail:{
                    type: alertType,
                    message: alertMessage
                },
                bubbles: true,
                composed: true
            })
        )


        // ESTA ES LA FORMA EN QUE LO HICE LA PRIMERA VEZ PERO NO ME GUSTABA REPETIR CODIGO.

        // if (userMatch) {
        //     this.dispatchEvent(
        //         new CustomEvent('onLogin', {
        //             detail: {
        //                 type: 'success',
        //                 message: 'Login exitoso.',
        //             },
        //             bubbles: true,
        //             composed: true,
        //         })
        //     );
        // } else {
        //     this.dispatchEvent(
        //         new CustomEvent('onLogin', {
        //             detail: {
        //                 type: 'error',
        //                 message: 'Usuario no encontrado.',
        //             },
        //             bubbles: true,
        //             composed: true,
        //         })
        //     );
        // }

    }
}


customElements.define("user-login", UserLogin);