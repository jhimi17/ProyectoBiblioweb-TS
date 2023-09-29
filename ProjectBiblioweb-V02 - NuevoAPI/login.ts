const form = document.querySelector('form') as HTMLFormElement; // Selecciona el formulario
const errorMessege = document.getElementById('error-messege') as HTMLElement;
const button = document.getElementById('button') as HTMLButtonElement;
const buttonText = document.getElementById('buttonText') as HTMLSpanElement;
const spinner = document.getElementById('spinner') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene la recarga de la página por defecto

    const data = {
        username: (form.username as HTMLInputElement).value,
        password: (form.password as HTMLInputElement).value
    };
    
    buttonText.textContent = 'Loading...';
    button.disabled = true;
    spinner.classList.remove('hidden');

    try {
        const response = await fetch(`http://servicio-biblioteca-unas.rj.r.appspot.com/genius/api/usuario/login/${data.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();

            if (userData.passwordUsuario === data.password) {
                // Autenticación exitosa, redirigir a otra página
                window.location.href = 'Bienvenido.html';
            } else {
                errorMessege.style.display = 'block';
            }
        } else {
            errorMessege.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al comunicarse con la API:', error);
    }
    buttonText.textContent = 'Login';
    button.disabled = false;
    spinner.classList.add('hidden');
});
